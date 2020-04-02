const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {type: String , required:true},
    email: {type: String , required:true},
    password: {type: String, required: true},
    type: {type: Number, required: true, default: 0},
    avatar: {type: String, require: false},
    confirm: {type: Boolean, require: false, default: false},
    confirmCode: {type: String, required: true},
    webhookUrl: {type: String, required: false},
    webhookToken: {type: String, required: false},
    apiKey: {type: String, required: true}
});
module.exports = mongoose.model('User',userSchema);
