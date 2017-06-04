/**
 * Created by Kanchan on 6/5/2017.
 */

var postModel = require('../models/postModel');
var userModel = require('../models/userModel');


var createPost = function (req) {

    console.log("cmng here.yyyyyyyyyyyyyyyy..", req.body);
    return new Promise(function (resolve, reject) {


        var res;
        var data = req.body;
        data.emailid = req.params.emailid;
        data.categoryname = req.params.categoryname;

        userModel.findBy({subscribed: data.categoryname}).then(function (response) {
            console.log("find by responsetttt>>>", response);
            // return;
            if (response && response.length>0) {

                var emailList = [];

                for (var i = 0; i < response.length; i++) {
                    if (response[i].emailid != data.emailid) {
                        emailList.push(response[i].emailid);
                    }

                }
                console.log("emailList>>", emailList);
                var mailOptions = {
                    to: emailList,
                    subject: 'Notification Email'
                };

                emailFile.sendMailToList(mailOptions, "notification.ejs", {from: data.emailid, post: data.post});

            }

                postModel.createPost(data).then(function (response) {

                    if (response) {
                        res = {
                            status: true,
                            message: "Post Addded Successfully",
                            result: response
                        };
                        resolve(res);
                    } else {
                        res = {
                            status: false,
                            message: "Post Cannot Be Added",
                            result: [response]
                        };
                        reject(res);
                    }

                }, function (err) {
                    res = {
                        status: false,
                        message: "Post Failed",
                        result: [response]
                    };
                    reject(res);

                });


        }, function (err) {

        });

    })

};


module.exports = {


    createPost: createPost

};