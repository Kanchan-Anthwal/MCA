/**
 * Created by Kanchan on 6/5/2017.
 */




var MongoClient=require('mongodb').MongoClient;
var config=require('./../utilities/config.json');

var postCollection;
MongoClient.connect(config.dbAddress+":"+config.dbPort+"/"+config.dbName, function(err, database) {
    if(err)
        console.log("Error connection database "+err);
    else{
        console.log("Db connected ");
        postCollection=database.collection(config.postCollection);

        //Below line is used to create index
        // userCollection.createIndex({emailid:""},{unique:true});

    }
});
var DbUtility={
    add:function(data){
        return new Promise(function(resolve,reject){
            console.log("data INsertion MODEL POST",data);
            postCollection.insert(data, function(err, result) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }

            });
        })

    },

    findAll:function(categoryname){
        console.log(">>>werty>>>>>");

        return new Promise(function(resolve,reject){

            console.log("find model>>>>");

            postCollection.find({categoryname:categoryname}).toArray(function (err,result) {

                if(err){
                    reject(err);
                }else{
                    console.log("result>>>",result);
                    resolve(result);
                }
            })
        });

    },
}
module.exports={
    createPost: DbUtility.add,
    getAllPost:DbUtility.findAll

};