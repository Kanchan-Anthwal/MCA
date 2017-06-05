/**
 * Created by kanchan on 5/1/2017.
 */


var express = require('express');
var router = express.Router();
var userService=require('../services/userService');

var usermodel=require('../models/userModel');


router.post('/register',function (req,res) {


    userService.addUser(req).then(function(response){

        console.log("Register api...",req.body);

        res.status(201).json(response);

    },function(err){
            res.status(500).json(err);
    })

});


router.post('/invite/:emailid/:name',function (req,res) {


    userService.invite(req).then(function(response){

        console.log("invite api...");

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});



router.put('/subscribe/:emailid',function (req,res) {


    userService.subscribe(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

router.put('/unsubscribe/:emailid',function (req,res) {


    userService.unSubscribe(req).then(function(response){

        res.status(200).json(response);

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

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});
router.get('/login/:emailid/:password',function (req,res) {

console.log("Login Api called>>>",req.params);
    userService.loginUser(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

module.exports=router;