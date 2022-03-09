// Sprite Controller

var dirs      = {
  "a": -1,
  "d": 1
}

var intervals = [];

var pLeft     = 0;
var pTop      = 0;

var duration  = 0; //useDiration for how long the current sprite image has been used

var leftWall  = 0;
var rightWall = 500;

var player    = document.getElementById("$player$");

function getNextSprite(curr) {
  var _curr       = curr.search("sprites/");
  var current     = curr.substring(_curr);

  if ((current == "sprites/Idle.png") || (current == "sprites/Walk2.png")){
    return "sprites/Walk.png";
  } else if (current == "sprites/Walk.png"){
    return "sprites/Walk2.png";
  }
}

export function moveSprite(event) {
  var key = event.key;
  if ((key != "a" && key != "d" && key != " ")) {
    return;
  }
  if (intervals.length > 0){
    return;
  }

  var leftInc = dirs[key];

  var m = setInterval(function () {
    var newLoc = pLeft + (leftInc*2);
    duration++;

    if ((newLoc < rightWall) && (newLoc > leftWall)) {
      player.style.left = newLoc + "px";
      pLeft = newLoc;

      if (duration % 14 == 0){
        player.src = getNextSprite(player.src);
      }
    }
  }, 10);

  intervals.push(m); // add to intervals
}

export function stopSprite(event) {
  var key = event.key;
  if (key != "a" && key != "d" && key != " ") {
    return;
  }

  for (var i = (intervals.length-1); i>-1; i--){
    clearInterval(intervals[i]);
    intervals.pop();
  }

  player.src = "sprites/Idle.png";
}

/*
module.exports = {
  "moveSprite":moveSprite,
  "stopSprite":stopSprite
};*/
