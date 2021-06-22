var express = require('express');
var router = express.Router();
var teamHelper=require('../helpers/team-helper');

function verifyTeam(Id){
  var isTeamId=false;
  switch (Id) {
    case "team01":
      isTeamId=true;
      break;
    case "team02":
      isTeamId=true;
      break;
    case "team03":
      isTeamId=true; 
    case "team04":
      isTeamId=true; 
    default:
      isTeamId=false;
      break;
  }
  return isTeamId;
}

function createTeam(teamId){
  let teamDetails={}
  //teamId
  teamDetails.teamId=teamId;
  //current clue number for leaderboard
  teamDetails.currentClue=1;
  // array for track user
  passedAnswers=[]
  datePassed = new Date();
  let time=datePassed.getHours() + ":" + datePassed.getMinutes() + ":" + datePassed.getSeconds();
  passedAnswers[0]={
    time: time,
    clueNo: 1,
  }
  teamDetails.passedAnswers=passedAnswers;
  return teamDetails;
}

function updateTeam(clueNo,passedAnswers){
  let teamDetails={}
  teamDetails.currentClue=clueNo;
  datePassed = new Date();
  let time=datePassed.getHours() + ":" + datePassed.getMinutes() + ":" + datePassed.getSeconds();
  trackingData={
    time: time,
    clueNo: clueNo,
  }
  passedAnswers.unshift(trackingData);
  teamDetails.passedAnswers=passedAnswers;
  return teamDetails;
}

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('player/play-zone');
});
router.post('/clue', function(req, res) {
  let data = req.body
  var teamId=data.teamId
  teamId=teamId.toLowerCase();
  if (verifyTeam(teamId)) {
    var answer=data.answer
    answer=answer.toLowerCase();
    switch(answer) {
      case "x":
        teamHelper.isTeam(teamId).then((result)=>{
          if(result){
            res.render('clues/TW1Qzgzlx0h',{msg:"You've already completed clue 1"})
          }else{
            teamDetails=createTeam(teamId)
            teamHelper.addTeam(teamDetails).then((data)=>{
              res.render('clues/TW1Qzgzlx0h')
            })
          }
        })
        break;
      case "y":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if(result.currentClue==2){
            res.render('clues/TW1Qzgzlx0',{msg:"Already completed clue 2"})
          }else{
            passedAnswers=result.passedAnswers
            teamDetails=updateTeam(2,passedAnswers)
            teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
              res.render('clues/TW1Qzgzlx0')
            })
          }
        })
        break;
      case "x y z":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if(result.currentClue==3){
            res.render('clues/TW1Qzgzlx0rt',{msg:"Already completed clue 3"})
          }else{
            passedAnswers=result.passedAnswers
            teamDetails=updateTeam(3,passedAnswers)
            teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
              res.render('clues/TW1Qzgzlx0rt')
            })
          }
        })
        break;
      default:
        res.render('player/play-zone',{error:"Wrong answer!"})
    }
  }else{
    res.render('player/play-zone',{error:"Wrong Team Id!"})
  }
});
router.get('/leaderboard', function(req, res) {
  res.render('partials/leaderboard',{layout: false});
});

module.exports = router;
