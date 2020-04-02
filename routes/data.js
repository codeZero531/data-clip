var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('../function/verifyToken');
const apiVerifyToken = require('../function/apiVerifyToken');




router.get('/:bucketId',verifyToken , (req, res, next) => {
    const bucketId = req.params.bucketId;
    const userId= req.userId;
    Table.find({user : userId, bucketId: bucketId})
        .then(
            result => {
                if (result.length ===1 ) {
                    // there is a bucket belongs to the user
                    Bucket.find({bucketId: bucketId})

                        .then(
                            result => res.send(result)
                        )
                        .catch( err => console.log(err));
                } else {
                    //no bucket belongs to logged user
                    res.send('Bucket not found');
                }
            }
        )
        .catch(err => res.send(err));

});

// for node api package
router.get('/node/:bucketName',apiVerifyToken ,async (req, res, next) => {

    try{
        const bucketName = req.params.bucketName;
        const apiToken = req.apiToken;
        let user = await User.findOne({apiToken: apiToken});
        if (!user){return res.status(403).json({status: 403, message: 'api key invalid!'})}
        const userId= user._id;
        let bucket = await Table.findOne({bucketName: bucketName, user: userId});
        if (!bucket){return res.status(403).json({status: 403, message: 'form name invalid!'})}
        const bucketId = bucket.bucketId;
        let data = await Bucket.findOne({bucketId: bucketId});
        if (!data){return res.status(403).json({status: 403, message: 'form data not found!'})}
        return res.status(200).json({status: 200, data: data.data, message: 'success'});
    }catch (e) {
        return res.status(403).json({status: 403, message: 'something went wrong'});
    }

});

module.exports = router;
