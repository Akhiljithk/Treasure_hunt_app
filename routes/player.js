var express = require('express');
const session = require('express-session');
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
    case "team05":
      isTeamId=true;
      break; 
    case "team06":
      isTeamId=true;
      break; 
    case "team07":
      isTeamId=true;
      break; 
    case "team08":
      isTeamId=true;
      break; 
    case "team09":
      isTeamId=true;
      break; 
    case "team10":
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
 // let time=datePassed.getUTCHours() + ":" + datePassed.getUTCMinutes() + ":" + datePassed.getUTCSeconds();
  time = new Date(datePassed).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
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
  //let time=datePassed.getUTCHours() + ":" + datePassed.getUTCMinutes() + ":" + datePassed.getUTCSeconds();
  time = new Date(datePassed).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
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
    console.log('RESULT IS NULL');
    return false
  } else {
    if (result.currentClue>=thisClueNo) {
      console.log('3>=3');
      return true
    } else {
      if (result.currentClue<thisClueNo) {
        console.log('3<thisClue');
        if (result.currentClue+1==thisClueNo) {
          console.log('3+1=4');
          return true
        } else {
          console.log('malpractice');
          return false
        }
      }
    }
  }
}

// function checkThisTeam(thisClueNo){
//   teamHelper.getTeamDetails(teamId).then((result)=>{
//     if (isCompletePrevClues(result,thisClueNo)) { 
//       if(result.currentClue==thisClueNo || result.currentClue>thisClueNo){
//         res.render('clues/clue3',{msg:"Already completed"})
//       }else{
//         passedAnswers=result.passedAnswers
//         teamDetails=updateTeam(thisClueNo,passedAnswers)
//         teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
//           res.render('clues/clue3')
//         })
//       }
//     } else {
//       session.errMsg = "Malpractice detected!"
//       res.redirect('/')
//     }
//   })
// }

/* GET users listing. */
router.get('/', function(req, res) {
  if (req.session.teamId) {
    teamId = req.session.teamId
    res.render('player/play-zone',{teamId,error:session.errMsg});
    session.errMsg = null
  } else {
    res.render('player/play-zone',{error:session.errMsg});
    session.errMsg = null
  }
});

router.post('/clue', function(req, res) {
  let data = req.body
  var teamId=data.teamId
  teamId=teamId.toLowerCase();
  if (verifyTeam(teamId)) {
    req.session.teamId=data.teamId
    var answer=data.answer
    answer=answer.toLowerCase();
    switch(answer) {
      case "google":
        teamHelper.isTeam(teamId).then((result)=>{
          if(result){
            res.render('clues/clue2',{msg:"Already completed"})
          }else{
            teamDetails=createTeam(teamId)
            teamHelper.addTeam(teamDetails).then((data)=>{
              res.render('clues/clue2')
            })
          }
        })
        break;
      case "safari":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,3)) { 
            if(result.currentClue==3 || result.currentClue>3){
              res.render('clues/clue3',{msg:"Already completed"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(3,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/clue3')
              })
            }
          } else {
            session.errMsg = "Malpractice detected!"
            res.redirect('/')
          }
        })
        break;
      case "siri":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,4)) {
            if(result.currentClue==4 || result.currentClue>4){
              res.render('clues/clue4',{msg:"Already completed"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(4,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/clue4')
              })
            }
          } else {
            session.errMsg = "Malpractice detected!"
            res.redirect('/')
          }
        })
        break;
      case "steve jobs":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,5)) {
            if(result.currentClue==5 || result.currentClue>5){
              res.render('clues/clue5',{msg:"Already completed"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(5,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/clue5')
              })
            }
          } else {
            res.render('player/play-zone',{error:"Malpractice detected!"})
          }
        })
        break;
      case "harvard university":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,6)) {
            if(result.currentClue==6 || result.currentClue>6){
              res.render('clues/clue6',{msg:"Already completed"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(6,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/clue6')
              })
            }
          } else {
            session.errMsg = "Malpractice detected!"
            res.redirect('/')
          }
        })
        break;
      case "russia":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,7)) {
            if(result.currentClue==7 || result.currentClue>7){
              res.render('clues/clue7',{msg:"Already completed"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(7,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/clue7')
              })
            }
          } else {
            session.errMsg = "Malpractice detected!"
            res.redirect('/')
          }
        })
        break;
      case "lei jun":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,8)) {
            if(result.currentClue==8 || result.currentClue>8){
              res.render('clues/clue8',{msg:"Already completed"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(8,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/clue8')
              })
            }
          } else {
            session.errMsg = "Malpractice detected!"
            res.redirect('/')
          }
        })
        break;
      case "wright brothers":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,9)) {
            if(result.currentClue==9 || result.currentClue>9){
              res.render('clues/clue9',{msg:"Already completed"})
            }else{
              passedAnswers=result.passedAnswers
              teamDetails=updateTeam(9,passedAnswers)
              teamHelper.updateTeam(teamId,teamDetails).then((result)=>{
                res.render('clues/clue9')
              })
            }
          } else {
            session.errMsg = "Malpractice detected!"
            res.redirect('/')
          }
        })
        break;
      case "alexander graham bell":
        teamHelper.getTeamDetails(teamId).then((result)=>{
          if (isCompletePrevClues(result,10)) {
            if(result.currentClue==10 || result.currentClue>10){
              res.render('clues/treasure')
            }else{
              passedAnswers=result.passedAnswers;
              teamDetails=updateTeam(10,passedAnswers);
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
            session.errMsg = "Malpractice detected!"
            res.redirect('/')
          }
        })
        break;
      default:
        session.errMsg = "Wrong answer!"
        res.redirect('/')
    }
  }else{
    session.errMsg = "Wrong Team Id!"
    res.redirect('/')
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
        let persentage=result.currentClue/10 * 100
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
