const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    bucketId: {type: String , required:true},
    bucketName: {type: String, required: true},
    site: {type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
});
module.exports = mongoose.model('Table', tableSchema);
