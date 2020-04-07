const User = require('../model/user');
const Slack = require('../model/slack');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const Integrations = require('../model/integration');
const mongoose = require('mongoose');
const request = require('request');
const _ = require('lodash');

async function slackSend(req, res, next) {
try {
    let slack = await Slack.findOne({_id: req.userId});
    let data = await req.body;
    let slackBody;
    console.log(req.isTest);
    if (!req.isTest) {
        const bucketId = await req.params.bucketId;
        const bucket = await Table.findOne({bucketId: bucketId}).populate('site');
        data = _.map(_.toPairs(data), d => _.fromPairs([d]));
        slackBody = {
            mrkdwn: true,
            text : `*New form submission | Form:  ${bucket.bucketName} | Site: ${bucket.site.siteName}*`,
            attachments: data.map((t) => ({
                text: `*${_.keys(t)}* :${_.values(t)}`,
                color: 'good'
            })),
        };
    }
    else {
        slackBody = {
            mrkdwn: true,
            text : `*New form submission (Test)*`,
            attachments: [
                {text: `*email* - john@gmail.com`,
                color: 'good'},
                {text: `*phone* - +86 54 25478 541`,
                    color: 'good'}
            ]
        };
    }

    await request({
        uri: slack.url,
        body: slackBody,
        method: 'POST',
        json: true
    }, function (err, result, body) {
        if (err && req.isTest){console.log(err); return res.json({status: false})}
        console.log(body);
        if (req.isTest){
            res.json({status: true, message: body})
        }
        next();
    });
} catch (e) {
    console.log(e);
}
}
module.exports = slackSend;
