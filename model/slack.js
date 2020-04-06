const mongoose = require('mongoose');

const slackSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    url: {type: String, required: true},
    team: {type: String, required: true},
    channel: {type: String, required: true}
});

module.exports = mongoose.model('Slack', slackSchema);

