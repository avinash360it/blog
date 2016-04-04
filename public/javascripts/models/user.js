/**
 * Created by root on 29/3/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name        : {type: String ,required: true},
    email       : {type: String, required: true, unique: true},
    password    : {type: String},// required: true, unique: true},
    profilePic  : String,
    createdAt   : Date
});

var User = mongoose.model('User',userSchema);

module.exports = User;

