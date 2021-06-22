const db = require('../config/dbConnection');
var objectId=require('mongodb').ObjectID

module.exports={

    getTeamDetails:(teamId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('Teams').findOne({teamId:teamId}).then((teamData)=>{
                if(teamData){
                    isTeam=true
                    resolve(isTeam)
                }else{
                    isTeam=false
                    resolve(isTeam)
                }
            })
        })
    },

    addTeam:(data,callBack)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('Teams').insertOne(data).then((data)=>{
                callBack(data.ops[0]._id)
            })
        })
    },

    updateTeam:(teamId,teamDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('Teams')
            .updateOne({teamId:teamId},{
                $set:{
                    Name:teamDetails.Name,
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    }

}