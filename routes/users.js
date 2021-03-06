var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const Slack = require('../model/slack');
const Integrations = require('../model/integration');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const verifyToken = require('../function/verifyToken');
const sendwebHook = require('../function/webhook');
const slackSend = require('../function/slackSend');

const smsSend = require('../function/mailSend');


const md5 = require('md5');

router.post('/verify-account',async (req, res,next) => {
   let user = await User.findById(req.body.userId).catch(err => console.log(err));
   if (!user){return res.json({status: false, message: 'something went wrong!'});}

   if (user.confirmCode === req.body.confirmCode){
       //code match
       User.updateOne({_id: req.body.userId}, {confirm: true})
           .then(
               result => {
                   return res.json({
                       status: true,
                       message: 'account verification successfully!'
                   })
               }
           )
           .catch(
               err => {
                   return res.json({
                       status: false,
                       message: 'something went wrong!'
                   })
               }
           );


   } else {
       // code not match
       return res.json({
           status: false,
           message: 'account verification failed!'
       })
   }

});

router.get('/get-user', verifyToken, async (req, res, next) => {
    const userId = req.userId;

    User.findById(userId)
        .then(
            result => {
                const avatar =  md5((result.email).toLocaleLowerCase());
                result.avatar = avatar;
                res.send(result);
            }
        )
        .catch(err => console.log(err));
});

router.get('/update-profile-name/:name',verifyToken,(req, res, next) => {
    const name = req.params.name;
    User.updateOne({_id: req.userId}, {name: name})
        .then(
            result => res.json({
                message: 'profile name update successfully!'
            })
        )
        .catch(
            err => res.json({
                message: err.message
            })
        );
});

router.post('/change-user-password',verifyToken, async (req, res, next) => {
    let user = await User.findOne({_id : req.userId});
    if (!user){ return res.status(203).json({status: false, message: 'User not found!'}) }

    bcrypt.compare(req.body.oldPassword, user.password, function (err, rs) {
            if (rs) {
                //old password matched
                bcrypt.hash(req.body.newPassword, saltRound, function (err, hashPassword) {
                    User.updateOne({_id: req.userId}, {password: hashPassword})
                        .then(
                            result => res.status(200).json({status: true, message: 'password change successfully!'})
                        )
                        .catch(
                            err => res.status(203).json({status: false, message: err.message})
                        );
                });

            } else {
                //old password not match
                res.status(203).json({status: false, message: 'old password not match!'})
            }
    });
});

router.get('/get-stats', verifyToken, async (req, res, next) => {

   let siteCount = await  Site.countDocuments({user: req.userId});
   let formCount = await  Table.countDocuments({user: req.userId});

    await res.json({
        siteCount: siteCount,
        formCount: formCount
    })
});



router.post('/register', (req, res, next) => {
   User.find({'email' : req.body.email})
       .then(
           result => {
               if (result.length === 1) {
                   //email already exits
                   res.status(203).json({
                       message: 'email already exists!',
                       status: false
                   });
               } else {
                   //email not exists
                   const confirmCode = shortId.generate();
                   bcrypt.hash(req.body.password, saltRound, function (err, hashPassword) {
                        const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hashPassword,
                            confirmCode: confirmCode,
                        });
                        smsSend(user.email, confirmCode, user._id);
                        user.save()
                            .then(
                                result => {
                                    res.status(201).json({
                                        message: 'user sign-up success, please check your email!',
                                        status: true,
                                        result: result
                                    });
                                }
                            )
                            .catch(
                                err => {
                                    res.status(203).json({
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
                            if (result[0].confirm){
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
                                res.status(203).json({
                                    message: 'Please confirm your account!',
                                    status: false
                                });
                            }


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
                            result => {
                                res.json({
                                    message: 'Form create successfully!',
                                    data: result
                                })
                            }
                        )
                        .catch(
                            err => {
                                res.json({
                                    message: err.message
                                })
                            }
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
    site.apiToken = 'api_'+site._id;
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
                        result => {
                            res.json({
                                message: 'Site create successfully!',
                                data: result
                            })
                        }
                    )
                    .catch(
                        err => {
                            res.json({
                                message: err.message
                            })
                        }
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

//get site data from siteid
router.get('/get-site-from-id/:id', verifyToken ,(req, res, next) => {
    const siteId = req.params.id;
    Site.findById(siteId)
        .then(
            result => {
                res.send(result)
            }
        )
        .catch(err => res.send(err));

});

//site Update
router.post('/site-update',verifyToken,(req, res, next) => {
    Site.updateOne(
        {_id: req.body.siteId},
        {siteName: req.body.siteName, host: req.body.host}
    )
        .then(
            result => res.json({
                message : 'site details update successfully!'
            })
        )
        .catch(err => {
            res.json({
                message: err.message
            })
        });

});

//delete bucket (form) from bucket id
router.get('/bucket-delete/:id', verifyToken,(req, res, next) => {
    const bucketId = req.params.id;
   Table.deleteOne({bucketId: bucketId})
       .then(
           result => {
               Bucket.deleteOne({bucketId: bucketId})
                   .then(
                       result => res.json({
                           message: 'form and data delete successfully!'
                       })
                   )
                   .catch(
                       err => res.json({
                           message: err.message
                       })
                   );
           }
       )
       .catch(
           err => res.json({
               message: err.message
           })
       );
});

//pdate bucket name from id
router.post('/update-bucket-name', verifyToken,(req, res, next) => {
    Table.updateOne({bucketId: req.body.bucketId}, {$set: {bucketName: req.body.bucketName}})
        .then(
            result => res.json({
                message: 'form name update successfully!'
            })
        )
        .catch(
            err => res.json({
                message: err.message
            })
        );
});

//delete site  from site id and all forms and data
router.get('/site-delete/:id', verifyToken,(req, res, next) => {
    const siteId = req.params.id;
    Site.deleteOne({_id: siteId})
        .then(
            result => {
                Table.deleteMany({site: siteId})
                    .then(result => {
                        Bucket.deleteMany({site: siteId})
                            .then(
                                result => {
                                    res.json({
                                        message: 'site and data delete successfully!'
                                    })
                                }
                            )
                            .catch(err => {
                                res.json({
                                    message: err.message
                                })
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(err);
                    });
            }
        )
        .catch(
            err => console.log(err)
        );
});

// integrations web hook functions -----------------------------------------------------------------------------------------------------------

router.post('/set-webhook', verifyToken,async (req, res, next) => {
   const token = shortId.generate(1);
   let integration = await Integrations.findOne({_id: req.body.siteId}).catch(err => console.log(err.message));
   if (integration){
       //update
       Integrations.updateOne({_id: req.body.siteId}, {user: req.userId, webhookUrl: req.body.webhookUrl, webhookToken: token})
           .then(
               result => {return  res.json({status: true, message: 'WEBHOOK update successfully!'})}
           )
           .catch(err => { return res.json({status: false, message: err.message}) });
   } else {
       //add
       const integration = new Integrations({
          _id : req.body.siteId,
          webhookUrl : req.body.webhookUrl,
          webhookToken : token,
          user: req.userId
       });

       integration.save()
           .then(
               result => {return  res.json({status: true, message: 'WEBHOOK set successfully!'})}
           )
           .catch(err => { return res.json({status: false, message: err.message}) });
   }

});
router.get('/get-webhook/:id', verifyToken,async (req, res, next) => {
  let integration = await Integrations.findById(req.params.id).catch(err=>console.log(err.message));
  if (integration) {
      return res.json({status: true, webhookUrl: integration.webhookUrl, webhookToken: integration.webhookToken});
  } else {
      return res.json({status: false});
  }
});
router.get('/delete-webhook/:id', verifyToken, async (req, res, next) => {
    Integrations.deleteOne({_id: req.params.id})
        .then(result => res.send(true))
        .catch(err=>console.log(err));
});

// get site api token
router.get('/get-site-api-token/:id', verifyToken,async (req, res, next) => {
   const siteId = req.params.id;
   let site = await Site.findById(siteId);
   if (site){return res.json({token: site.apiToken})}
});

//save slack integration details
router.post('/save-slack-details', verifyToken ,(req, res, next) => {
    const data = req.body;
    data._id = req.userId;
    const slack = new Slack(data);
    slack.save()
        .then(result => res.json({message: 'ok', result: result}))
        .catch(err => res.json({message: err.message}));
});

//get slack details from user id
router.get('/get-slack-details', verifyToken ,(req, res, next) => {
    Slack.findOne({_id: req.userId})
        .then(result => res.json({status: true, data: result}))
        .catch(err => res.json({status: false, err: err.message}));
});

//delete slack details from user id
router.get('/delete-slack', verifyToken ,(req, res, next) => {
    Slack.deleteOne({_id: req.userId})
        .then(result => res.json({status: true, data: result}))
        .catch(err => res.json({status: false, err: err.message}));
});
//send test item slack
router.get('/send-test-item-slack', verifyToken,(req, res, next) => {
    req.isTest = true;
    slackSend(req, res, next);
    // res.status(200).json('ok');
});




module.exports = router;
