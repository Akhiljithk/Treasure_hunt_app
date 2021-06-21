var express = require('express');
var router = express.Router();

function verifyTeam(Id){
  var isTeamId=false;
  let VarifyteamId=Id.toLowerCase();
  switch (VarifyteamId) {
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

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('player/play-zone');
});
router.post('/clue', function(req, res) {
  let data = req.body
  var teamId=data.teamId
  if (verifyTeam(teamId)) {
    var answer=data.answer
    answer=answer.toLowerCase();
    switch(answer) {
      case "x":
        res.render('clues/TW1Qzgzlx0h')
        break;
      case "y":
        res.render('clues/TW1Qzgzlx0')
        break;
      case "x y z":
        res.render('clues/TW1Qzgzlx0rt')
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
