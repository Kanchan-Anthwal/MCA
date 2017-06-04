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

        //Below line is used to create index
        userCollection.createIndex({emailid:""},{unique:true});

    }
});
var DbUtility={
         add:function(data){
              return new Promise(function(resolve,reject){
              console.log("data INsertion MODEL",data);
          userCollection.insert(data, function(err, result) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }

            });
        })

    },
    find:function(data){
        console.log(">>>werty>>>>>");

        return new Promise(function(resolve,reject){

            console.log("find model>>>>",data.emailid);
            var obj={emailid:data.emailid};
            if(data.password){
                obj.password=data.password;
            }

            userCollection.findOne(obj, function(err, result) {

                console.log("find model err>>>>",err,"********",result);

                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }

            });
        });

    },

    update:function(data){
        return new Promise(function(resolve,reject){

            console.log("update model>>>>",data);
            userCollection.findOneAndUpdate({emailid:data.emailid},{$set:{password:data.password}}, function(err, result) {

                console.log("update model err>>>>",err,"********",result);

                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }

            });
        })

    }
};

module.exports={
    addUser: DbUtility.add,
    updateUser:DbUtility.update,
    getUser:DbUtility.find
};
