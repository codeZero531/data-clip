var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');


router.post('/register', (req, res, next) => {
   User.find({'email' : req.body.email})
       .then(
           result => {
               if (result.length === 1) {
                   //email already exits
                   res.status(400).json({
                       message: 'email already exists!',
                       status: false
                   });
               } else {
                   //email not exists
                   bcrypt.hash(req.body.password, saltRound, function (err, hashPassword) {
                        const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hashPassword
                        });
                        user.save()
                            .then(
                                result => {
                                    res.status(201).json({
                                        message: 'user sign-up success!',
                                        status: true,
                                        result: result
                                    });
                                }
                            )
                            .catch(
                                err => {
                                    res.status(400).json({
                                        message: err.message,
                                        status: false
                                    });
                                }
                            );
                   });

               }
           }
       ).catch(err => console.log(err));
});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .then(
            result => {
                if (result.length === 1 ) {
                  //email found
                    bcrypt.compare(req.body.password, result[0].password, function (err, rs) {
                        if (rs === true) {
                            // token genarate
                            let payload = {subject: result[0]._id};
                            console.log(payload);
                            let token = jwt.sign(payload, 'janaka');
                            //success
                            res.status(200).json({
                                message: 'Login successfully!',
                                status: rs,
                                result: result,
                                token: token
                            });

                        } else {
                            //password invalid
                            res.status(203).json({
                                message: 'Password invalid. Please check again!',
                                status: rs
                            });
                        }
                    });
                } else {
                    //email not found
                    res.status(203).json({
                        message: 'Email not found!',
                        status: false
                    });
                }
            }
        ).catch(err => console.log(err));

});

router.post('/create-bucket', (req, res, next) => {
    const table = new Table({
       _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        bucketId:  2,
        bucketName: req.body.bucketName
    });
    table.save()
        .then(
            result => res.send(result)
        )
        .catch(
            err => res.send(err)
        );
});


module.exports = router;
