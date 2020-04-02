var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const mongoose = require('mongoose');
const apiVerifyToken = require('../function/apiVerifyToken');
const _ = require('lodash');
// for node api package
router.get('/:bucketName',apiVerifyToken ,async (req, res, next) => {
    try{
        const bucketName = req.params.bucketName;
        const apiToken = req.apiToken;
        let user = await User.findOne({apiToken: apiToken});
        if (!user){return res.status(403).json({status: 403, message: 'api key invalid'})}
        const userId= user._id;
        let bucket = await Table.findOne({bucketName: bucketName, user: userId});
        if (!bucket){return res.status(403).json({status: 403, message: 'form name invalid'})}
        const bucketId = bucket.bucketId;
        let data = await Bucket.findOne({bucketId: bucketId});
        if (!data){return res.status(403).json({status: 403, message: 'form data not found'})}
        return res.status(200).json({status: 200, data: data.data, message: 'success', form_name: bucketName});
    }catch (e) {
        return res.status(403).json({status: 403, message: 'something went wrong'});
    }
});

router.post('/data/:bucketName',apiVerifyToken,async (req, res, next) => {
    console.log(req.params.bucketName);
   console.log(req.apiToken);
   console.log(req.body);
    try {
        const apiToken = req.apiToken;
        let bucketWithFewDetails = await Table.findOne({bucketName: req.params.bucketName});
        if (!bucketWithFewDetails){ return res.status(403).json({status: false, message: 'form name invalid'}) }
        const bucketId = await bucketWithFewDetails.bucketId;
        let user = await User.findOne({apiToken: apiToken});
        const userId = user._id;
        if (!user){return res.status(403).json({status: false, message: 'api key invalid'})}
        let userType = await user.type;

        let dataLimit = await getDataLimit(userType);
        let bucketData = await Bucket.findOne({bucketId: bucketId});

        let bucket = await Table.findOne({user: userId, bucketId: bucketId}).populate('site');
        if (!bucket) {
            return res.status(403).json({status: false, message: 'no bucket belongs to user!'})
        }

        //host check
        const siteId = bucket.site._id;
        const host = bucket.site.host;
        console.log(req.headers.host);
        // if (host !== req.headers.host){
        //     return res.status(403).json({status: false, error: 'host not matched!'});
        // }

        // no bucket belongs to user
        if (bucketData && bucketData.data.length >= dataLimit) {
            return res.status(403).json({status: false, message: 'your plan expire with limits!'})
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

module.exports = router;
