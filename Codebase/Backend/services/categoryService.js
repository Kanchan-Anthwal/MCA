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

            reject(res);

        });

    })

};

module.exports = {


    getAllCategory: getAllCategory

};