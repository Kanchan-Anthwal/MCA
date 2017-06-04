/**
 * Created by kanchan on 5/1/2017.
 */


var categoryModel = require('../models/categoryModel');
var utility = require('../utilities/utility');

var getAllCategory = function (req) {

    return new Promise(function (resolve, reject) {

        console.log("cmng here..get.", req.params.emailid);
        var res;

        categoryModel.getAllCategory().then(function (response) {
            if (response) {
                res = {
                    status: true,
                    message: "Categories Fetched Successfully",
                    result: response
                };
                resolve(res);
            } else {
                res = {
                    status: false,
                    message: "No Categories Found",
                   result: [response]
                };
                reject(res);
            }



        }, function (err) {
            res = {
                status: false,
                message: "Categories Cannot be Fetched ",
                result: [err]
            };

            reject(res);

        });

    })

};
var getCategoryByName = function (req) {

    return new Promise(function (resolve, reject) {

        var res;

        categoryModel.getCategoryByName({name: req.params.name}).then(function (response) {
            if (response) {
                res = {
                        status: true,
                        message: "Category Fetched Successfully",
                        result: [response]
                    };
                resolve(res);
            } else {
                res = {
                    status: false,
                    message: "No Category Found",
                    result: [response]
                };
                reject(res);
            }



        }, function (err) {
            res = {
                status: false,
                message: "Category Cannot be Fetched ",
                result: [err]
            };

            console.log("^^^^^^^^^^^yyyyyyy^^^^^");
            reject(res);

        });

    })

};
var addCategory = function (req) {

    return new Promise(function (resolve, reject) {

        var res;

        categoryModel.addCategory(req.body).then(function (response) {
            if (response) {
                res = {
                    status: true,
                    message: "Category Added Successfully",
                    result: [response]
                };
                resolve(res);
            } else {
                res = {
                    status: false,
                    message: "No Category Found",
                    result: [response]
                };
                reject(res);
            };



        }, function (err) {
            res = {
                status: false

            };
            if(err && err.errmsg.indexOf("duplicate key error")!=-1){

                res.message= "Category with given name already exist";

            }else {

                res.message= "Category Cannot be Added ";
            }

            res.result= [err];

            reject(res);

        });

    })

};

var deleteCategoryByName = function (req) {

    return new Promise(function (resolve, reject) {

        var res;

        categoryModel.deleteCategoryByName({name: req.params.name}).then(function (response) {
            if (response.value) {
                res = {
                    status: true,
                    message: "Category Deleted Successfully",
                    result: [response]
                };
                resolve(res);
            } else {
                res = {
                    status: false,
                    message: "No Category Found",
                    result: [response]
                };
                reject(res);
            };



        }, function (err) {


            res = {
                status: false,
                message: "Category Cannot be Deleted ",
                result: [err]
            };

            reject(res);

        });

    })

};

module.exports = {


    getAllCategory: getAllCategory,
    getCategoryByName:getCategoryByName,
    addCategory:addCategory,
    deleteCategoryByName:deleteCategoryByName

};