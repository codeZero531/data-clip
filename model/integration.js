const mongoose = require('mongoose');

const integrationSchema = mongoose.Schema({
    _id : {type : mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    webhookUrl: {type: String, required: true},
    webhookToken: {type: String, required: true},
});

module.exports = mongoose.model('Integration', integrationSchema);
