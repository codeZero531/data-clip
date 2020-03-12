var express = require('express');
var router = express.Router();
const request = require('request');
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const mongoose = require('mongoose');

/* GET home page. */
router.post('/:userId/:bucketId', function(req, res, next) {
    const userId = req.params.userId;
    const bucketId = req.params.bucketId;
    Table.find({user: userId, bucketId: bucketId})
        .then(
            result => {
                if (result.length === 1) {
                    //there is a bucket belongs to user
                    const bucket = new Bucket({
                        _id: new mongoose.Types.ObjectId(),
                        bucketId: bucketId,
                        data: req.body
                    });
                    bucket.save()
                        .then(
                            result => res.send(result)
                        )
                        .catch(
                            err => res.send(err)
                        );

                } else {
                    //no bucket belongs to user
                    res.send('no bucket belongs to user!')
                }
            }
        )
        .catch(err => res.send(err));


});

router.get('/', function(req, res, next) {
    const id = req.params.id;
    const name = req.params.name;
    res.send('error');
});

module.exports = router;
