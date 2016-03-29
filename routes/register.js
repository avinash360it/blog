/**
 * Created by root on 29/3/16.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: '../images/profile_pic/'}).single('profilePic');
var User = require('../public/javascripts/models/user');

router.post('/process', function (req,res,next) { //upload.single('profilePic')
    upload(req,res, function (err) {
        if(err){
            console.log(err);
        }
    });
    //console.log(req);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePic: '',//req.file.path,
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