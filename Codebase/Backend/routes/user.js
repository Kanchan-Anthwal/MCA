/**
 * Created by kanchan on 5/1/2017.
 */


var express = require('express');
var router = express.Router();
var userService=require('../services/userService');

var usermodel=require('../models/userModel');


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

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

router.put('/forgotpass/:emailid',function (req,res) {


    userService.forgotPassword(req).then(function(response){

        res.status(201).json(response);

    },function(err){
        res.status(500).json(err);
    })

});
router.get('/:emailid',function (req,res) {


    userService.getUser(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

module.exports=router;