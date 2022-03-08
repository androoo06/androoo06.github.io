// main file hopefully
var moving   = false;

var sprites  = {};
sprites.Idle = document.getElementById("player$idle");

function moveSprite(event) {
  var key = event.key;
  if (key != "a" && key != "d" && key != " ") {
    return;
  }

/*
  var p = 0;
  var m = setInterval(function () {
    p++;
    sprites.Idle.style.left = p + "px";
    if (pos == 200){
      clearInterval(m);
    }
  }, 25);
*/

  sprites.Idle.style.left = "3000px";

  alert('vv');

}

document.addEventListener('keydown', moveSprite);
