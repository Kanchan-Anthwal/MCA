/**
 * Created by kanchan on 4/30/2017.
 */

var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');
var ejs = require('ejs');

var  config=require('./config.json');



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailid,
        pass: config.password
    }
});

var Email={
 sendMail:function (mailOptions,template,data) {
     console.log("__dirname???",__dirname);
     return new Promise(function (resolve,reject) {
         var compiled = ejs.compile(fs.readFileSync(dirPath + "/templates/"+template, 'utf8'));
         var html = compiled(data);

         mailOptions.html=html;

         console.log("llllll",html);
         transporter.sendMail(mailOptions, function(error, info){
             if (error) {
                 reject(error)
             } else {

                 resolve(info);
             }
         });

     })






     }

};
module.exports = Email;