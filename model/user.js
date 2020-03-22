const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {type: String , required:true},
    email: {type: String , required:true},
    password: {type: String, required: true},
    type: {type: Number, required: true, default: 0}
});
module.exports = mongoose.model('User',userSchema);
