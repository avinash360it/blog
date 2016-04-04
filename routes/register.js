/**
 * Created by root on 29/3/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
var User = require('../public/javascripts/models/user');
var mime = require('mime');

var storage = multer.diskStorage({
    destination: function (req,res, cb) {
        cb(null, path.join(__dirname,'../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.'+mime.extension(file.mimetype));
    }
});

var upload = multer({storage: storage});

router.post('/process',upload.single('profilePic'), function (req,res,next) {

    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePic: req.file.filename,
        createdAt: new Date()
    }).save(function(err){
            if(err){
                //throw err;
                res.send(false);
            }else{
                //console.log('User has been saved');
                res.send(true);
            }
        });
});

module.exports = router;