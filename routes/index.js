var express = require('express');
var router = express.Router();
const request = require('request');
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const mongoose = require('mongoose');
const hello = require('get-form-data');
const formidable = require('formidable');
const sendwebHook = require('../function/webhook');
const _ = require('lodash');



function getDataLimit(userType) {
    switch (userType) {
        case 0:
            return 500;
        case 1:
            return 10000;
        case 2:
            return 10000;
        default:
            return 20000;
    }
}

//data insert
router.post('/:userId/:bucketId',sendwebHook,async function (req, res, next) {
    try {
        const userId = await req.params.userId;
        const bucketId = await req.params.bucketId;
        let user = await User.findById(userId);
        let userType = await user.type;
        let dataLimit = await getDataLimit(userType);
        let bucketData = await Bucket.findOne({bucketId: bucketId});

        let bucket = await Table.findOne({user: userId, bucketId: bucketId}).populate('site');
        if (!bucket) {
            return res.status(403).json({status: false, error: 'no bucket belongs to user!'})
        }

        //host check
        const siteId = bucket.site._id;
        const host = bucket.site.host;
        console.log(req.headers.host);
        if (host !== req.headers.host){
            return res.status(403).json({status: false, error: 'host not matched!'});
        }

        // no bucket belongs to user
        if (bucketData && bucketData.data.length >= dataLimit) {
            return res.status(403).json({status: false, error: 'your plan expire with limits!'})
        }

        //keys and data filters
        const data = req.body;
        const  keys = _.keys(data);
        data.date = Date();

        let bucketInBucket = await Bucket.findOne({bucketId: bucketId});
        if (bucketInBucket){
            //push data to bucket
            console.log('thynwa');
            Bucket.updateOne(
                {bucketId: bucketId},
                {$push: {data: data}},
            )
                .then(result => {
                    Bucket.updateOne(
                        {bucketId: bucketId},
                        {$addToSet: {keys: keys}}
                    )
                        .then(result => {return res.status(201).json({status: true, message: 'data saved!'})});

                });


        }else{
            //create an add data to bucket
            console.log('naha');
            const bucket = new Bucket({
                _id: new mongoose.Types.ObjectId(),
                bucketId: bucketId,
                data: data,
                site: siteId
            });
            bucket.save()
                .then(
                    result => {
                        Bucket.updateOne(
                            {bucketId: bucketId},
                            {$addToSet: {keys: keys}},
                        )
                            .then(result => {return res.status(201).json({status: true, message: 'data saved!'})});
                    }
                );

        }


    }catch (e) {
        console.log(e.message);
        res.status(403).json({status: false, message: 'failed', err: e.message});
    }

});

router.get('/', function (req, res, next) {
    const id = req.params.id;
    const name = req.params.name;
    res.send('working');
});

module.exports = router;
