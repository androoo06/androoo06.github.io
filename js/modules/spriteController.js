// Sprite Controller

var dirs      = {
  "a": -1,
  "d": 1
}

var intervals = [];

var pLeft     = 0;
var pTop      = 0;

var duration  = 0; //useDiration for how long the current sprite image has been used
var cycleDir  = 1;

var leftWall  = 0;
var rightWall = 500;

export var player = document.getElementById("$player$");

function getNextSprite(curr) {
    var _curr       = curr.search("sprites/");
    var current     = curr.substring(_curr);

    if (current == "sprites/Idle.png") {
        return "sprites/walk0.jpg";
    }

    var walkNum    = parseInt(current.substring(12));
    if (!isNaN(walkNum)) {
        cycleDir = (walkNum == 0) ?  1 : cycleDir;
        cycleDir = (walkNum == 3) ? -1 : cycleDir;

        var newWalk  = (walkNum + cycleDir);

        console.log(newWalk);

        return "sprites/walk"+ (newWalk) +".jpg";
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
