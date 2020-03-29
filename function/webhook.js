var express = require('express');
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const Integrations = require('../model/integration');
const mongoose = require('mongoose');
const formidable = require('formidable');

async function sendwebHook(req, res, next) {
    const userId = await req.params.userId;
    const bucketId = await req.params.bucketId;
    let table = await Table.findOne({bucketId: bucketId}).populate('user').populate('site').catch(err => console.log(err.message));
    if (!table) {
        return res.status(203).send('bucket not found');
    }
    let integration = await Integrations.findById(table.site).catch(err => console.log(err.message));
    if (integration) {
        // console.log(table);
        // // console.log(integration);
        // const hey = formidable({ multiples: true });
        //
        // hey.parse(req, (err, fields, files) => {
        //     if (err) {
        //         next(err);
        //         return;
        //     }
        // });
        const data = {
            token: integration.webhookToken,
            user: {
                user_id: table.user._id,
                name: table.user.name,
                email: table.user.email
            },
            site: {
                site_id: table.site._id,
                name: table.site.siteName,
                host: table.site.host
            },
            form: {
                form_id: table.bucketId,
                name: table.bucketName
            },
            payload: req
        };
        console.log(req);
        next();

    }
    try {
        // let payload = jwt.verify( token, 'janaka') ;
        // req.userId = payload.subject;
        console.log(userId);
        console.log(bucketId);
        console.log('hello wade ok');
    } catch (e) {
        console.log('hello notok');
        return res.status(401).send('Unauthorized request');

    }


}

module.exports = sendwebHook;
