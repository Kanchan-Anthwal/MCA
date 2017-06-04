/**
 * Created by kanchan on 4/30/2017.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.configFile=require('./utilities/config.json');
var MongoClient=require('mongodb').MongoClient;
var user=require('./routes/user');
var category=require('./routes/category');
var post=require('./routes/post');


var os = require('os');
var fs = require('fs');
global.emailFile=require('./utilities/email');
var app = express();
global.dirPath=__dirname;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    // // var err = new Error('Not Found');
    // // err.status = 404;
    // next();
    req.log=log;
    console.log("}}}}}}}}}",req.body,req.params);
    // console.log("setting access control info");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
    // Pass to next layer of middleware
    //next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/user",user);
app.use("/category",category);
app.use("/post",post);



app.listen(configFile.port, function() {

    console.log('App listening at http://%s:%s', configFile.hostname, configFile.port);
});
if (!fs.existsSync(__dirname + '\\logs')){
    console.log("dirr not exist..make dir>>");
    fs.mkdirSync(__dirname + '\\logs');

}
if (os.platform().indexOf('win') > -1){
    console.log("create lod dir>>>",__dirname + '\\logs');

    var opts = {
        logDirectory: __dirname + '\\logs',
        fileNamePattern: 'votwlogs.log',
        dateFormat: 'YYYY.MM.DD'
    };
}
else {
    var opts = {
        logDirectory: __dirname + '/logs',
        fileNamePattern: 'votwlogs.log',
        dateFormat: 'YYYY.MM.DD'
    };
}
var log = require('simple-node-logger').createRollingFileLogger(opts);

// var db=MongoClient.connect(config.dbAddress+":"+config.dbPort+"/"+config.dbName, function(err, database) {
//     if(err)
//         console.log("Error connection database "+err);
//     else
//         console.log("Db connected ");
// });

process.on('uncaughtException', function(err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    log.error('Exception:j ' + err.stack);
});


module.exports = app;
