/**
 * Created by root on 29/3/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
//var upload = multer({ dest: '/public/images/profile_pic/'});
console.log(path.join(__dirname,'../public/uploads'));
//var upload = multer({ dest: __dirname + '../public/uploads/'});
var upload = multer({ dest: path.join(__dirname,'../public/uploads')});
var User = require('../public/javascripts/models/user');

router.post('/process',upload.single('profilePic'), function (req,res,next) {
//router.post('/process',upload, function (req,res,next) {
    //console.log(req);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePic: req.file.path,
        createdAt: new Date()
    }).save(function(err){
            if(err){
                throw err;
            }else{
                console.log('User has been saved');
                res.send(true);
            }
        });
});

module.exports = router;