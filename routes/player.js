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
      break; 
    case "team04":
      isTeamId=true;
      break; 
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
  teamDetails.currentClue=2;
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
    clueNo: clueNo-1,
  }
  passedAnswers.unshift(trackingData);
  teamDetails.passedAnswers=passedAnswers;
  return teamDetails;
}

function isCompletePrevClues(result,thisClueNo) {
  if (result===null) {
    return false
  } else {
    if (result.currentClue==thisClueNo) {
      return true
    } else {
      if (result.currentClue>thisClueNo) {
        return true
      } else {
        thisClueNo=thisClueNo-1;
        if (result.currentClue==thisClueNo) {
          return true
        } else {
          return false
        }
      }
    }
  }
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
          if (isCompletePrevClues(result,3)) {
            if(result.currentClue==3){
              res.render('clues/TW1Qzgzlx0',{msg:"Already completed clue 2"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(3,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/TW1Qzgzlx0')
              })
            }
          } else {
            res.render('player/play-zone',{error:"Malpractice detected!"})
          }
        })
        break;
      case "x y z":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,4)) {
            if(result.currentClue==4){
              res.render('clues/TW1Qzgzlx0rt',{msg:"Already completed clue 3"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(4,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/TW1Qzgzlx0rt')
              })
            }
          } else {
            res.render('player/play-zone',{error:"Malpractice detected!"})
          }
        })
        break;
      case "final answer":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,5)) {
            if(result.currentClue==5){
              res.render('clues/treasure')
            }else{
              passedAnswers=result.passedAnswers;
              teamDetails=updateTeam(5,passedAnswers);
              teamDetails.atTreasure=true;
              let temp=teamDetails.passedAnswers;
              let treasureTime=temp[0];
              teamDetails.treasureTime=treasureTime.time;
              console.log(teamDetails);
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/treasure')
              })
            }
          } else {
            res.render('player/play-zone',{error:"Malpractice detected!"})
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
  teamHelper.getAllTeamData().then((TeamData)=>{
    TeamData.sort((a,b)=>{
      return a.currentClue - b.currentClue
     })
     TeamData.reverse();
     var i = 1
     TeamData.forEach(element => {
      element.index=i
      i++;
    });
    res.render('partials/leaderboard',{layout: false,TeamData});
  })
});

router.get('/track', function(req, res) {
  teamHelper.getAllTeamData().then((TeamData)=>{
    TeamData.sort((a,b)=>{
      return a.currentClue - b.currentClue
     })
     TeamData.reverse();
     var i = 1
     TeamData.forEach(element => {
      element.index=i
      i++;
    });
    res.render('admin/playerTracker',{TeamData});
  })
})
router.get('/player-progress', function(req, res) {
    res.render('player/player-progress');
})

router.post('/player-progress', function(req, res) {
  let data = req.body
  var teamId=data.teamId
  teamId=teamId.toLowerCase();
  teamHelper.isTeam(teamId).then((response)=>{
    if (response) {
      teamHelper.getOneTeamData(teamId).then((result)=>{
        let persentage=result.currentClue/4 * 100
        res.render('player/player-progress',{persentage,teamId});
      })
    } else {
      res.render('player/player-progress',{error:"No such team"});
    }
  })
})

router.get('/*', function(req, res) {
    res.render('player/exception-page',{layout:false});
})

module.exports = router;
