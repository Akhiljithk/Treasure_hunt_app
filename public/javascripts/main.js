function changeBtnText(){
    document.getElementById("btn-text").innerHTML = '<i class="fa fa-lock-open"></i> Unlocking clue...';
    setTimeout(function(){
      document.getElementById("btn-text").innerHTML  = '<i class="fa fa-lock"></i> Unlock';
    }, 3000)
}

function play() {
    var audio = document.getElementById('audio');
    var playBtn = document.getElementById('play');
    var animation = document.getElementById('music-animation');
    if (audio.paused) {
        animation.style.display = "block";
        playBtn.style.display = "none";
        audio.currentTime = 10
        audio.play();
        $('#play').removeClass('glyphicon-play-circle')
        $('#play').addClass('glyphicon-pause')
    }else{
        animation.style.display = "none";
        playBtn.style.display = "block";
        audio.pause();
        audio.currentTime = 0
        $('#play').addClass('glyphicon-play-circle')
        $('#play').removeClass('glyphicon-pause')
    }
}
