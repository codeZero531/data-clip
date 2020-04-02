var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const mongoose = require('mongoose');
const apiVerifyToken = require('../function/apiVerifyToken');

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

module.exports = router;
