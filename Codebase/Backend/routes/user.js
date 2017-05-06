/**
 * Created by kanchan on 5/1/2017.
 */


var express = require('express');
var router = express.Router();
var userService=require('../services/userService');

router.post('/register',function (req,res) {


    userService.addUser(req).then(function(response){

        console.log("cmngttt here...");

        res.status(201).json(response);

    },function(err){
            res.status(500).json(err);
    })

});
router.put('/changepass/:emailid',function (req,res) {


    userService.changePassword(req).then(function(response){

        res.status(201).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

router.put('/forgotpass/:emailid',function (req,res) {


    userService.addUser(req).then(function(response){

        res.status(201).json(response);

    },function(err){
        res.status(500).json(err);
    })

});


module.exports=router;