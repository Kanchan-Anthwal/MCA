/**
 * Created by kanchan on 5/6/2017.
 */


var shortid = require('shortid');



exports.AutoGenerateId=function(){

    return shortid.generate();

};