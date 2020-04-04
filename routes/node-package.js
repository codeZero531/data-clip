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
        const siteId = req.apiToken.slice(4);
        let site = await Site.findById(siteId);
        if (!site){return res.status(403).json({status: 403, message: 'api key invalid'})}
        let bucket = await Table.findOne({bucketName: bucketName, site: site._id});
        if (!bucket){return res.status(403).json({status: 403, message: 'form name invalid'})}
        const bucketId = bucket.bucketId;
        let data = await Bucket.findOne({bucketId: bucketId});
        if (!data){return res.status(403).json({status: 200, message: 'form data empty', data: []})}
        return res.status(200).json({status: 200, data: data.data, last_entry: data.updatedAt ,message: 'success', form_name: bucketName});
    }catch (e) {
        return res.status(403).json({status: 403, message: 'something went wrong'});
    }
});

router.post('/data/:bucketName',apiVerifyToken,async (req, res, next) => {
    try {
        const siteId = req.apiToken.slice(4);

        let site = await Site.findById(siteId);
        if (!site){return res.status(403).json({status: 403, message: 'api key invalid'})}
        let bucketWithFewDetails = await Table.findOne({bucketName: req.params.bucketName, site: siteId});
        if (!bucketWithFewDetails){ return res.status(403).json({status: 403, message: 'form name invalid'}) }
        const bucketId = await bucketWithFewDetails.bucketId;
        let user = await User.findById(site.user);
        const userId = user._id;
        let userType = await user.type;

        let dataLimit = await getDataLimit(userType);
        let bucketData = await Bucket.findOne({bucketId: bucketId});

        let bucket = await Table.findOne({user: userId, bucketId: bucketId}).populate('site');
        if (!bucket) {
            return res.status(403).json({status: 403, message: 'no bucket belongs to user!'})
        }

        if (bucketData && bucketData.data.length >= dataLimit) {
            return res.status(403).json({status: 403, message: 'your plan expire with limits'})
        }

        //keys and data filters
        const data = req.body;
        let keys = null;
        if(_.isArrayLikeObject(data)){
            data.forEach(function(item, index, array) {
                keys = _.keys(item);
                item.date = Date();
            });
        } else{
            keys = _.keys(data);
            data.date = Date();
        }

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
                        .then(result => {return res.status(201).json({status: 201, message: 'data saved success',form_name: req.params.bucketName, data: data})});

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
                            .then(result => {return res.status(201).json({status: 201, message: 'data saved success',form_name: req.params.bucketName, data: data})});
                    }
                );

        }


    }catch (e) {
        console.log(e.message);
        res.status(403).json({status: 403, message: 'something went wrong'});
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

router.post('/git', (req, res, next) => {
   console.log(req.body);
});

module.exports = router;
