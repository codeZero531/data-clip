var express = require('express');
const User = require('../model/user');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const Integrations = require('../model/integration');
const mongoose = require('mongoose');
const formidable = require('formidable');
const _ = require('lodash');
const request = require('request');

async function sendwebHook(req, res, next) {
    const userId = await req.params.userId;
    const bucketId = await req.params.bucketId;
    let table = await Table.findOne({bucketId: bucketId}).populate('user').populate('site').catch(err => console.log(err.message));
    if (!table) {
        return res.status(403).json({status: false, message: 'bucket not found'});
    }
    let integration = await Integrations.findById(table.site).catch(err => console.log(err.message));

    try {
        if (integration) {
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
                payload: req.body
            };
            request.post(integration.webhookUrl, {
                json: data
            }, (error, res, body) => {
                if (error) {
                    console.error(error.message);
                } else {
                    // console.log(`statusCode: ${res.statusCode}`);
                    console.log(body);
                }

            })
        }
        next();
    } catch (e) {
       res.status(403).json({status: false, error: e.message});
    }


}

module.exports = sendwebHook;
