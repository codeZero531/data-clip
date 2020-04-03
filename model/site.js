const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    siteName: {type: String, required: true},
    host: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    apiToken: {type: String, required: true}
});

module.exports = mongoose.model('Site', siteSchema);
