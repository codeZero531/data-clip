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
const shortId = require('shortid');
const verifyToken = require('../function/verifyToken');


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

//bucket create
router.post('/create-bucket',verifyToken, (req, res, next) => {
    const bucketId = shortId.generate();
    Site.findById(req.body.siteId)
        .then(
            result => {
                console.log(result.user);
                if (result.user == req.userId) {
                    // site belongs to user
                    const table = new Table({
                       _id: new mongoose.Types.ObjectId(),
                        user: req.userId,
                        bucketId:  bucketId,
                        bucketName: req.body.bucketName,
                        site: req.body.siteId
                    });

                    table.save()
                        .then(
                            result => res.send(result)
                        )
                        .catch(
                            err => res.send(err)
                        );
                }else {
                    //site not belong to user id
                    res.send('site not belongs to user id')

                }
            }
        )
        .catch(
            err => res.send(err.message)
        );

});

//site create
router.post('/create-site',verifyToken ,(req, res, next) => {
    const site = new Site({
        _id: new mongoose.Types.ObjectId(),
        siteName: req.body.siteName,
        host: req.body.hostName,
        user: req.userId

    });
    site.save()
        .then(
            result => {
                //creat default bucket
                const bucketId = shortId.generate();
                const table = new Table({
                    _id: new mongoose.Types.ObjectId(),
                    user: req.userId,
                    bucketId:  bucketId,
                    bucketName: 'default',
                    site : result._id
                });
                table.save()
                    .then(
                        result => res.send(result)
                    )
                    .catch(
                        err => res.send(err)
                    );
            }
        )
        .catch(
            err => res.send(err)
        );
});

// getsites
router.get('/get-sites',verifyToken, (req, res, next) => {
    Site.find({user: req.userId})
        .then(result => res.send(result))
        .catch(err => res.send(err));

});

//get site data
router.get('/get-site/:id', verifyToken, (req, res, next) => {
   const siteId = req.params.id;
   Site.findById(siteId)
       .then(
           result => {
               if (result.user == req.userId) {
                  // site belong to user
                   Table.find({site: siteId})
                       .populate('site')
                       .then(result => res.send(result))
                       .catch(err => res.send(err));


               } else {
                   // site not elongs to user
                   res.send('unauthorized access. Site not belongs to user');
               }
           }
       )
       .catch( err => res.send(err));

});


module.exports = router;
