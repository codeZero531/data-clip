const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    bucketId: {type: String, required: true},
    data: {type: Array , required:true}
});

module.exports = mongoose.model('Bucket', bucketSchema);
