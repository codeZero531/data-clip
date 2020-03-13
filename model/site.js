const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    siteName: {type: String, required: true},
});

module.exports = mongoose.model('Site', siteSchema);
