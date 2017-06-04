/**
 * Created by kanchan on 5/28/2017.
 */



var express = require('express');
var router = express.Router();
var categoryService=require("../services/categoryService");

router.get('/getall',function (req,res) {

    console.log("getAll Categry Api called>>>",req.params);
    categoryService.getAllCategory(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

router.get('/:name',function (req,res) {

    console.log("getAll Categry Api called>>>",req.params);
    categoryService.getCategoryByName(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

router.delete('/:name',function (req,res) {

    console.log("Delete Categry Api called>>>",req.params.name);
    categoryService.deleteCategoryByName(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

router.post('/',function (req,res) {

    console.log("Add Categry Api called>>>",req.params);
    categoryService.addCategory(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});


module.exports=router;