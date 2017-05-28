/**
 * Created by kanchan on 5/28/2017.
 */



var express = require('express');
var router = express.Router();
var categoryService=require("../services/categoryService");

router.get('/getAll',function (req,res) {

    console.log("getAll Categry Api called>>>",req.params);
    categoryService.getAllCategory(req).then(function(response){

        res.status(200).json(response);

    },function(err){
        res.status(500).json(err);
    })

});

module.exports=router;