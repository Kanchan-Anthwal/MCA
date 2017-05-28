/**
 * Created by kanchan on 5/1/2017.
 */


var MongoClient=require('mongodb').MongoClient;
var config=require('./../utilities/config.json');

var categoryCollection;
MongoClient.connect(config.dbAddress+":"+config.dbPort+"/"+config.dbName, function(err, database) {
    if(err)
        console.log("Error connection database "+err);
    else{
        console.log("Db connected ");
        categoryCollection=database.collection(config.categoryCollection);

        //Below line is used to create index
        // userCollection.createIndex({password:""},{unique:true});

    }
});
var DbUtility={
    findAll:function(){
        console.log(">>>werty>>>>>");

        return new Promise(function(resolve,reject){

            console.log("find model>>>>");
         /*   categoryCollection.find(function(err, result) {

                console.log("find model err>>>>",err,"********",result);

                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }

            });*/


         categoryCollection.find().toArray(function (err,result) {

             if(err){
                 reject(err);
             }else{
                 console.log("result>>>",result);
                 resolve(result);
             }
         })
        });

    },


};

module.exports={

    getAllCategory:DbUtility.findAll
};
