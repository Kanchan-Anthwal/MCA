/**
 * Created by kanchan on 5/1/2017.
 */


var MongoClient=require('mongodb').MongoClient;
var config=require('./../utilities/config.json');

var userCollection;
MongoClient.connect(config.dbAddress+":"+config.dbPort+"/"+config.dbName, function(err, database) {
    if(err)
        console.log("Error connection database "+err);
    else{
        console.log("Db connected ");
        userCollection=database.collection(config.userCollection);
        userCollection.createIndex({password:""},{unique:true});

    }
});
var DbUtility={
         add:function(data){
              return new Promise(function(resolve,reject){
              console.log("modelsssss");
          userCollection.insert(data, function(err, result) {
                if(err){
                    reject({status:false,results:[err]});
                }
                else{
                    resolve({status:true,results:[result]});
                }

            });
        })

    },
    update:function(data){
        return new Promise(function(resolve,reject){

            userCollection.update(data, function(err, result) {
                if(err){
                    reject({status:false,results:[err]});
                }
                else{
                    resolve({status:true,results:[result]});
                }

            });
        })

    }
};

module.exports={
    addUser: DbUtility.add,
    updateUser:DbUtility.update
};
