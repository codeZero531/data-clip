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
router.post('/:userId/:bucketId',async function (req, res, next) {
    const userId = await req.params.userId;
    const bucketId = await req.params.bucketId;
    let user = await User.findById(userId);
    let userType = await user.type;
    let dataLimit = await getDataLimit(userType);
    let bucketData = await Bucket.findOne({bucketId: bucketId});

    let bucket = await Table.findOne({user: userId, bucketId: bucketId});
    if (!bucket) {
        return res.send('no bucket belongs to user');
    }
    const siteName = bucket.site;

    // no bucket belongs to user
    if (bucketData && bucketData.data.length >= dataLimit) {
        return res.send('limit over')
    }

    const data = req.body;
    const  keys = _.keys(data);
    data.date = Date();

    let bucketInBucket = await Bucket.findOne({bucketId: bucketId}).catch(err=>console.log(err));
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
                     .then(result => {return res.json({status: 'success', result: result})})
                     .catch(err => {return res.send(err.message)});
             })
             .catch(err => {return res.send(err.message)});

    }else{
        //create an add data to bucket
        console.log('naha');
        const bucket = new Bucket({
            _id: new mongoose.Types.ObjectId(),
            bucketId: bucketId,
            data: data,
            site: siteName
        });
        bucket.save()
            .then(
                result => {
                    Bucket.updateOne(
                        {bucketId: bucketId},
                        {$addToSet: {keys: keys}},
                    )
                        .then(result => {return res.json({status: 'success', result: result})})
                        .catch(err => {return res.send(err.message)});
                }
            )
            .catch(err => {return res.send(err.message)});

    }

   

});

router.get('/', function (req, res, next) {
    const id = req.params.id;
    const name = req.params.name;
    res.send('working');
});

module.exports = router;
