const User = require('../model/user');
const Slack = require('../model/slack');
const Bucket = require('../model/bucket');
const Table = require('../model/table');
const Site = require('../model/site');
const Integrations = require('../model/integration');
const mongoose = require('mongoose');
const request = require('request');

async function slackSend(req, res, next) {
try {
    console.log('hello');
    let slack = await Slack.findOne({_id: req.userId});
    const data = {
        text: 'hello this is from sessrver'
    };
    console.log(slack);
    await request({
        uri: slack.url,
        json: data,
        method: 'POST'
    }, function (err, result, body) {
        if (err){console.log(err.message)}
        console.log(body);
        next();
    });
} catch (e) {
    console.log(e);
}
}
module.exports = slackSend;
