var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('player/play-zone');
});
router.post('/clue', function(req, res) {
  let data = req.body
  teamId=data.teamId
  answer=data.answer
  switch(answer) {
    case "x":
      res.render('clues/clue1')
      break;
    case "y":
      res.render('clues/clue2')
      break;
    default:
      res.render('player/play-zone',{error:"Wrong answer!"})
  }
});
router.get('/leaderboard', function(req, res) {
  res.render('partials/leaderboard',{layout: false});
});

module.exports = router;
