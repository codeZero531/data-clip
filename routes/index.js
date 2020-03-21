var express = require('express');
var router = express.Router();
const request = require('request');
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const mongoose = require('mongoose');
const hello = require('get-form-data');
const formidable = require('formidable');

//data insert
router.post('/:userId/:bucketId', function(req, res, next) {
    const userId = req.params.userId;
    const bucketId = req.params.bucketId;
    Table.find({user: userId, bucketId: bucketId})
        .then(
            result => {
                if (result.length === 1) {
                    const form = formidable({ multiples: true });
                    // form.parse(req, (err, fields, files) => {
                    //     if (err) {
                    //         console.log(err);
                    //         next(err);
                    //         return;
                    //     }
                    //     console.log('fields:', fields);
                    //     res.json({ fields, files });
                    // });
                    const  keys = [];
                    const values = [];
                    const hello = [];
                    form.parse(req, (err, fields, files) => {
                        fields.date = Date();
                        console.log('fields: '+ ' ' + fields);

                        // there is a bucket belongs to user
                        Bucket.find({bucketId: bucketId})
                            .then(
                                result => {
                                    console.log(result.length);
                                    if (result.length !== 0) {
                                        //bucket data have. push data
                                        Bucket.updateOne(
                                            {bucketId : bucketId},
                                            {$push : {data : fields}}
                                        )
                                            .then(result => {
                                                //insert keys
                                                Bucket.updateOne(
                                                    {bucketId : bucketId},
                                                    {$addToSet : {keys : keys}}
                                                )
                                                    .then(resu => console.log(resu))
                                                    .catch(err => console.log(err));

                                                res.json({
                                                    status: 'success',
                                                    result: result
                                                })
                                            })
                                            .catch(err => res.send(err));

                                    } else {
                                        // no bucket data. must create new bucket data
                                        const bucket = new Bucket({
                                            _id: new mongoose.Types.ObjectId(),
                                            bucketId: bucketId,
                                            data: fields
                                        });
                                        bucket.save()
                                            .then(
                                                result => {
                                                    // insert keys
                                                    Bucket.updateOne(
                                                        {bucketId : bucketId},
                                                        {$addToSet : {keys : keys}}
                                                    )
                                                        .then(resu => console.log(resu))
                                                        .catch(err => console.log(err));


                                                    res.json({
                                                        status: 'success',
                                                        result: result,
                                                    })
                                                }
                                            )
                                            .catch(
                                                err => res.send(err)
                                            );

                                    }
                                }
                            )
                            .catch(err => console.log(err));


                        // console.log('files:', files);
                    });
                    form.once('error', console.error);

                    form.on('fileBegin', (filename, file) => {
                        form.emit('data', { name: 'fileBegin', filename, value: file });
                    });

                    form.on('file', (filename, file) => {
                        form.emit('data', { name: 'file', key: filename, value: file });
                    });

                    form.on('field', (fieldName, fieldValue) => {
                        form.emit('data', { name: 'field', key: fieldName, value: fieldValue });
                    });

                    form.once('end', () => {
                        console.log('Done!');
                        console.log(keys);
                        // Bucket.updateOne(
                        //     {bucketId : bucketId},
                        //     {$addToSet : {keys : keys}}
                        // )
                        //     .then(result => console.log(result))
                        //     .catch(err => console.log(err));

                    });

                    form.on('data', ({ name, key, value, buffer, start, end}) => {
                        // console.log(`keys : ${key} , value : ${value}`);
                        keys.push(key);
                        // values.push(value);
                        hello.push({ key : value});

                    });


                    //
                    // let data = getFormData(req.body);






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
