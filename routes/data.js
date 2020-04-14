var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const mongoose = require('mongoose');
const verifyToken = require('../function/verifyToken');


router.get('/:bucketId',verifyToken , (req, res, next) => {
    const bucketId = req.params.bucketId;
    const userId= req.userId;
    Table.find({user : userId, bucketId: bucketId})
        .then(
            result => {
                if (result.length ===1 ) {
                    // there is a bucket belongs to the user
                    // Bucket.find({bucketId: bucketId})
                    Bucket.aggregate(
                        [{$match: {bucketId: bucketId}},
                        {$unwind: {path: "$data"}},
                        {$sort: {"data.date": -1}},
                                  ]
                    )

                        .then(
                            result => {
                                console.log(result);
                                res.send(result);
                            }
                        )
                        .catch( err => console.log(err));
                } else {
                    //no bucket belongs to logged user
                    res.send('Bucket not found');
                }
            }
        )
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});



module.exports = router;
