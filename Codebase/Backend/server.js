/**
 * Created by kanchan on 4/30/2017.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config=require('./config.json');
var app = express();
var MongoClient=require('mongodb').MongoClient;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(config.port, function() {

    console.log('App listening at http://%s:%s', config.hostname, config.port);
});

MongoClient.connect(config.dbAddress+":"+config.dbPort+"/"+config.dbName, function(err, database) {

    if(err){

        console.log("Error connection database "+err);

    }else{
        console.log("Db connected ");



    }

});


module.exports = app;