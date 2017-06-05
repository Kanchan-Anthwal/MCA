/**
 * Created by kanchan on 5/1/2017.
 */


var userModel = require('../models/userModel');
var utility = require('../utilities/utility');

var addUser = function (req) {

    console.log("cmng here.yyyyyyyyyyyyyyyy..", req.body);
    return new Promise(function (resolve, reject) {

        console.log("cmng here...");
        var data = {emailid: req.body.emailid, name: req.body.name, password: utility.AutoGenerateId()};
        data.emailid = data.emailid.toLocaleLowerCase();
        var res;

        userModel.addUser(data).then(function (response) {

            var mailOptions = {
                to: data.emailid,
                subject: 'RightNow App Registration Email'
            };

            emailFile.sendMail(mailOptions, "newUser.ejs", data).then(function (response) {

                console.log("serviceeeeeee", response);


                res = {
                    status: true,
                    message: "User Created Successfully and Mail Sent to the registered EmailId",
                    result: [response]
                };

                resolve(res);

            }, function (err) {

                res = {
                    status: false,
                    message: "Mail Sending Failed",
                    result: [err]
                };
                reject(res);

            });

        }, function (err) {

            res = {
                status: false

            };
            if (err && err.errmsg.indexOf("duplicate key error") != -1) {

                res.message = "User with given emailid already exist";

            } else {

                res.message = "User Cannot be Created";
            }

            res.result = [err];
            reject(res);

        });

    })

};

var changePassword = function (req) {

    return new Promise(function (resolve, reject) {

        console.log("cmng here..updateUser.");
        var res;

        var data = {emailid: req.params.emailid, password: req.body.password};

        data.emailid = data.emailid.toLocaleLowerCase();

        userModel.updateUser(data).then(function (response) {
            console.log("response", response);

            if (response.value) {

                var mailOptions = {
                    to: data.emailid,
                    subject: 'RightNow App Change Password Email'
                };

                emailFile.sendMail(mailOptions, "changePassword.ejs", {changedPassword: data.password}).then(function (response) {

                    res = {
                        status: true,
                        message: "Password Changed Successfully and Mail Sent to the registered EmailId",
                        result: [response]
                    };

                    resolve(res);


                }, function (err) {
                    res = {
                        status: false,
                        message: "Mail Sending Failed",
                        result: [err]
                    };
                    reject(res);

                });
            } else {
                console.log("ppppppppp");
                res = {
                    status: false,
                    message: "No User Found",
                    result: [response]
                };

                reject(res);
            }

        }, function (err) {
            res = {
                status: false,
                message: "Password Cannot Be Changed",
                result: [err]
            };

            reject(res);

        });

    })

};
var getUser = function (req) {

    return new Promise(function (resolve, reject) {

        console.log("cmng here..get.", req.params.emailid);
        var res;
        var data = {emailid: req.params.emailid};
        data.emailid = data.emailid.toLocaleLowerCase();

        userModel.getUser(data).then(function (response) {
            if (response) {
                res = {
                    status: true,
                    message: "User Fetched Successfully",
                    result: [response]
                };
                resolve(res);
            } else {
                res = {
                    status: false,
                    message: "No User Found",
                    result: [response]
                };
                reject(res);
            }


        }, function (err) {
            res = {
                status: false,
                message: "User Cannot be Fetched ",
                result: [err]
            };

            console.log("^^^^^^^^^^^yyyyyyy^^^^^");
            reject(res);

        });

    })

};
var loginUser = function (req) {

    return new Promise(function (resolve, reject) {

        console.log("cmng here..get.", req.params.emailid);
        var res;
        var data = {emailid: req.params.emailid, password: req.params.password};
        data.emailid = data.emailid.toLowerCase();

        userModel.getUser(data).then(function (response) {
            if (response) {
                res = {
                    status: true,
                    message: "User Fetched Successfully",
                    result: [response]
                };
                resolve(res);
            } else {
                res = {
                    status: false,
                    message: "No User Found",
                    result: [response]
                };
                reject(res);
            }


        }, function (err) {
            res = {
                status: false,
                message: "User Cannot Login ",
                result: [err]
            };

            console.log("^^^^^^^^^^^yyyyyyy^^^^^");
            reject(res);

        });

    })

};
var forgotPassword = function (req) {
    return new Promise(function (resolve, reject) {

        console.log("cmng here..updateUser.");
        var res;

        var data = {emailid: req.params.emailid, password: utility.AutoGenerateId()};

        data.emailid = data.emailid.toLowerCase();
        userModel.updateUser(data).then(function (response) {
            console.log("response", response);

            if (response.value) {

                var mailOptions = {
                    to: data.emailid,
                    subject: 'RightNow App Forgot Password Email'
                };

                emailFile.sendMail(mailOptions, "forgotPassword.ejs", {forgotPassword: data.password}).then(function (response) {

                    res = {
                        status: true,
                        message: "Password Set Successfully and Mail Sent to the registered EmailId",
                        result: [response]
                    };

                    resolve(res);


                }, function (err) {
                    res = {
                        status: false,
                        message: "Mail Sending Failed",
                        result: [err]
                    };
                    reject(res);

                });
            } else {
                console.log("ppppppppp");
                res = {
                    status: false,
                    message: "No User Found",
                    result: [response]
                };

                reject(res);
            }

        }, function (err) {
            res = {
                status: false,
                message: "Password cannot Be Set",
                result: [err]
            };

            reject(res);

        });

    })

};
var subscribe = function (req) {
    return new Promise(function (resolve, reject) {

        console.log("cmng here..updateUser.");
        var res;

        var data = {emailid: req.params.emailid, categoryname: req.body.categoryname};

        data.emailid = data.emailid.toLowerCase();


        userModel.getUser(data).then(function (response) {
            console.log("response", response);
            // return;

            if (response) {

                if (response.subscribed) {

                    console.log('SUBSCRIBED');
                    var user = response;

                    user.subscribed.push(data.categoryname);


                    userModel.updateUserAll(user).then(function (response) {

                        var mailOptions = {
                            to: data.emailid,
                            subject: 'Service Subscribed Email'
                        };

                        emailFile.sendMail(mailOptions, "subscribe.ejs", {categoryname: data.categoryname,username:user.name}).
                        then(function (response) {

                            res = {
                                status: true,
                                message: "Subscribed Successfully and Mail Sent to the registered EmailId",
                                result: [response]
                            };

                            resolve(res);


                        }, function (err) {
                            res = {
                                status: false,
                                message: "Mail Sending Failed",
                                result: [err]
                            };
                            reject(res);

                        });

                    }, function (err) {
                        res = {
                            status: false,
                            message: "Cannot be Subscribed",
                            result: [err]
                        };

                        reject(res);

                    });


                } else {

                    console.log('SUBSCRIBED');

                    var user = response;
                    var subscribe=[data.categoryname];
                    user.subscribed=subscribe;

console.log("user updated>>",user);
// return;
                    userModel.updateUserAll(user).then(function (response) {

                        var mailOptions = {
                            to: data.emailid,
                            subject: 'RightNow App Forgot Password Email'
                        };

                        emailFile.sendMail(mailOptions, "subscribe.ejs", {categoryname: data.categoryname,username:user.name}).
                        then(function (response) {

                            res = {
                                status: true,
                                message: "Subscribed Successfully and Mail Sent to the registered EmailId",
                                result: [response]
                            };

                            resolve(res);


                        }, function (err) {
                            res = {
                                status: false,
                                message: "Mail Sending Failed",
                                result: [err]
                            };
                            reject(res);

                        });

                    }, function (err) {
                        res = {
                            status: false,
                            message: "Cannot be Subscribed",
                            result: [err]
                        };

                        reject(res);

                    });
                }
//

            } else {
                console.log("ppppppppp");
                res = {
                    status: false,
                    message: "No User Found",
                    result: [response]
                };

                reject(res);
            }

        }, function (err) {
            res = {
                status: false,
                message: "Subscription Failed",
                result: [err]
            };

            reject(res);

        });

    })

};
var unSubscribe = function (req) {
    return new Promise(function (resolve, reject) {

        console.log("Unsubscribe");
        var res;

        var data = {emailid: req.params.emailid, categoryname: req.body.categoryname};

        data.emailid = data.emailid.toLowerCase();


        userModel.getUser(data).then(function (response) {
            console.log("response", response);
            console.log("data", data);

            // return;

            if (response) {

                if (response.subscribed) {

                    console.log('SUBSCRIBED');
                    var user = response;

                    for(var i=0;i<user.subscribed.length;i++){
                        if(user.subscribed[i]==data.categoryname){
                          user.subscribed.splice(i,1);
                        }
                    }

                    if(user.subscribed.length==0){
                        delete user.subscribed;
                    }

                   console.log("updated user obj>>",user);

                    userModel.updateUserAll(user).then(function (response) {

                        var mailOptions = {
                            to: data.emailid,
                            subject: 'Service Unsubscribed Email'
                        };

                        emailFile.sendMail(mailOptions, "unsubscribe.ejs", {categoryname: data.categoryname,username:user.name}).
                        then(function (response) {

                            res = {
                                status: true,
                                message: "Unsubscribed Successfully and Mail Sent to the registered EmailId",
                                result: [response]
                            };

                            resolve(res);


                        }, function (err) {
                            res = {
                                status: false,
                                message: "Mail Sending Failed",
                                result: [err]
                            };
                            reject(res);

                        });

                    }, function (err) {
                        res = {
                            status: false,
                            message: "Cannot be Subscribed",
                            result: [err]
                        };

                        reject(res);

                    });


                }else{
                    res = {
                        status: false,
                        message: "Not Subscribed",
                        result: [response]
                    };

                    reject(res);
                }
//

            } else {

                res = {
                    status: false,
                    message: "No User Found",
                    result: [response]
                };

                reject(res);
            }

        }, function (err) {
            res = {
                status: false,
                message: "Unsubscription Failed",
                result: [err]
            };

            reject(res);

        });

    })

};

var invite=function(req){

    return new Promise(function (resolve, reject) {

        if(req.body && req.params.emailid && req.params.name){
        var mailOptions = {
            to: req.body.invitetoemailid,
            subject: 'RightNow App Invitation Email'
        };

        var invitationData={toemail:req.body.invitetoemailid,fromemail:req.params.emailid,fromname:req.params.name};
        console.log("invitation data",invitationData);
        // return;

        emailFile.sendMail(mailOptions, "invitation.ejs", invitationData).then(function (response) {
            console.log("Send email");

            res = {
                status: true,
                message: "Invitation Email Sent to the Invited EmailId",
                result: [response]
            };

            resolve(res);


        }, function (err) {
            res = {
                status: false,
                message: "Mail Sending Failed",
                result: [err]
            };
            reject(res);

        });
    }
})
}
module.exports = {

    addUser: addUser,
    changePassword: changePassword,
    forgotPassword: forgotPassword,
    getUser: getUser,
    loginUser: loginUser,
    subscribe: subscribe,
    unSubscribe: unSubscribe,
    invite:invite

};