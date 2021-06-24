function changeBtnText(){
    document.getElementById("btn-text").innerHTML = '<i class="fa fa-lock-open"></i> Unlocking clue...';
    setTimeout(function(){
      document.getElementById("btn-text").innerHTML  = '<i class="fa fa-lock"></i> Unlock';
    }, 3000)
}