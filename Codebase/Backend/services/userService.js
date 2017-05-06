/**
 * Created by kanchan on 5/1/2017.
 */


var userModel=require('../models/userModel');
var utility=require('../utilities/utility');

var addUser=function (req) {

    return new Promise(function (resolve,reject) {

        console.log("cmng here...");
       var data={ emailid : req.body.emailid, password :req.body.password };
       var res;

        userModel.addUser(data).then(function(response){

            var mailOptions={
                to: data.emailid,
                subject: 'RightNow App Registration Email'
            };

            emailFile.sendMail(mailOptions,"newUser.ejs",data).then(function (response) {

                console.log("serviceeeeeee",response);


                res={
                status:true,
                message:"User Created Successfully and Mail Sent to the registered EmailId",
                result:[response]
                }

                resolve(res);

            },function(err){

               res={
                    status:false,
                    message:"Mail Sending Failed",
                    result:[err]
                }
                reject(res);

            });

        },function(err){
            res={
                status:false,
                message:"User Cannot be Created",
                result:[err]
            }

            reject(res);

        });

    })

};

var updateUser=function (req) {

    return new Promise(function (resolve,reject) {

        console.log("cmng here...");
        var data={ emailid : req.params.emailid, password : req.body.password };
        var res;

        userModel.updateUser(data).then(function(response){

            var mailOptions={
                to: data.emailid,
                subject: 'RightNow App Change Password Email'
            };

            emailFile.sendMail(mailOptions,"changePassword.ejs",data).then(function (response) {

                res={
                    status:true,
                    message:"Password Changed Successfully and Mail Sent to the registered EmailId",
                    result:[response]
                }

                resolve(res);

            },function(err){

                // response.message="Mail Sending Failed";

                res={
                    status:false,
                    message:"Mail Sending Failed",
                    result:[err]
                }
                reject(res);

            });

        },function(err){
            res={
                status:false,
                message:"Password Changed Successfully",
                result:[err]
            }

            reject(res);

        });

    })

};
module.exports={

    addUser: addUser,
    changePassword: updateUser
}