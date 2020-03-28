const mongoose = require('mongoose');

const integrationSchema = mongoose.Schema({
    _id : {type : mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
    siteName: {type: String, required: true},
    host: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

module.exports = mongoose.model('Integration', integrationSchema);
