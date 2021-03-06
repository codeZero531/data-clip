var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const Slack = require('../model/slack');
const mongoose = require('mongoose');
const apiVerifyToken = require('../function/apiVerifyToken');
const _ = require('lodash');
const request = require('request');
const querystring = require('querystring');

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

        let bucket = await Table.findOne({bucketName: req.params.bucketName, site: siteId}).populate('site');
        if (!bucket){ return res.status(403).json({status: 403, message: 'form name invalid'}) }

        const bucketId = await bucket.bucketId;
        let user = await User.findById(site.user);
        let userType = await user.type;

        let dataLimit = await getDataLimit(userType);
        let bucketData = await Bucket.findOne({bucketId: bucketId});


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
            // console.log('thynwa');
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
            // console.log('naha');
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
        return res.status(403).json({status: 403, message: 'something went wrong'});
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

router.get('/slack/get', async (req, res, next) => {
    const code = req.query.code;
    console.log(code);
    const data = {
        code: code,
        client_id: '1045337279207.1050427310372',
        client_secret: '23f9b5084aea497cf982cb3c49add0f2',
    };
    const formData = querystring.stringify(data);
    await request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'https://slack.com/api/oauth.v2.access',
        body: formData,
        method: 'POST'
    }, function (err, result, body) {
        if (err){return res.send(err.message)}
        if (!body.ok) {return res.send('something went wrong')}
        const data = {
          url: body.incoming_webhook.url,
          team: body.team.name,
          channel: body.incoming_webhook.channel
        };


    });
});

router.get('/slack/check', (req, res, next) =>{

});






module.exports = router;
