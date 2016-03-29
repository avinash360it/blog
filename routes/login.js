/**
 * Created by root on 28/3/16.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.send('index',{title: 'test'});
});

module.exports = router;