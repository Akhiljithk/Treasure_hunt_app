const mongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const state={
    db:null,
}

module.exports.connect=function(done){
    //const url = 'mongodb+srv://TreasureHunt:TreasureHuntPassword@cluster0.psrtx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const url = 'mongodb://localhost:27017';
    const dbName = 'treasurehunt'; 
 
    return new Promise(async(resolve,reject)=>{
        await mongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true },(err,data)=>{
            if(err) return done(err)
            state.db=data.db(dbName)
            done()
        })
     })
};

module.exports.get=function(){
    return state.db
};