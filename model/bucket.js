const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    bucketId: {type: String, required: true, ref: 'Bucket'},
    data: {type: Array , required:true},
    keys: {type: Array, required: false},
    updatedAt: {type: Date, required: false}
});

module.exports = mongoose.model('Bucket', bucketSchema);
