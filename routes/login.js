/**
 * Created by root on 28/3/16.
 */
var express = require('express');
var router = express.Router();
var Users = require('../public/javascripts/models/user');


router.get('/',function(req,res,next){
    res.send('index',{title: 'test'});
});

/*check if the user exists in the database with the credentials that have been provided*/
router.post('/', function(req,res,next){
    var email       = req.body.email || '';
    var password    = req.body.password || '';
    req.session.user = {};
    if(email && password){
     Users.where({email : email ,password : password}).findOne(function (err,data) {
         if(err){
             throw err;
         }else{
             if(data){
                 /*save the user values to the session here*/
                 var userSession = {_id: data._id,name: data.name,email:data.email,profilePic:data.profilePic,status:'success' };
                 req.session.user = userSession;
                 res.json(userSession);
             }else{
                 res.json({status:'failure'});
             }
         }
     });
    }else{
        res.json({status: 'missing_fields'});
    }
});

router.get('/check-session', function (req,res,next) {
    console.log(req.session.user);
});

router.get('/logout', function (req,res,next) {
    req.session.user = null;
});

module.exports = router;