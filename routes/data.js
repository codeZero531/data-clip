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
router.get('/node/:bucketId' , (req, res, next) => {
    const bucketId = req.params.bucketId;
    const userId= req.userId;
    Table.find({ bucketId: bucketId})
        .then(
            result => {
                if (result.length ===1 ) {
                    // there is a bucket belongs to the user
                    Bucket.findOne({bucketId: bucketId})

                        .then(
                            result => {
                                res.status(200).json({status: 200, data: result.data, message: 'success'});
                            }
                        )
                        .catch( err => {console.log(err); res.status(403).json({status: 403, message: err.message})});
                } else {
                    //no bucket belongs to logged user
                    res.status(403).json({status: 403, message: 'Bucket not found'});
                }
            }
        )
        .catch(err => res.send(err));

});

module.exports = router;
