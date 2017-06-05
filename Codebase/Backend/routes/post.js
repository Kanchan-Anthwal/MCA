/**
 * Created by Kanchan on 6/5/2017.
 */

var express = require('express');
var router = express.Router();
var postService=require("../services/postService");
router.post('/create/:emailid/:categoryname',function (req,res) {

    console.log("Add POst Api called>>>",req.params);
    postService.createPost(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

router.get('/getall/:categoryname',function (req,res) {

    console.log("Add POst Api called>>>",req.params);
    postService.getAllPost(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});
// router.post('/',function (req,res) {
//
//     console.log("Add POst Api called>>>",req.params);
//     postService.createPost(req).then(function(response){
//
//         res.status(200).json(response);
//
//     },function(err){
//         res.status(500).json(err);
//     })
//
// });





module.exports=router;