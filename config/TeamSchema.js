const mongoose = require('mongoose')

const team = new mongoose.Schema({
    teamId:{
        type:String
    },
    currentClue:{
        type:Number
    },
    teamName:{
        type:String
    },
    passedAnswers:[{time:Date,clueNo:Number}]
})

module.exports = Team = mongoose.model('team',team);