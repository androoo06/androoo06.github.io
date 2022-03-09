// Sprite Controller

var dirs      = {
  "a": -1,
  "d": 1
}

var intervals = [];
var ckd       = null; // current key down

var pDim      = 64

var pLeft     = 0;
var pTop      = 0;

var duration  = 0; //useDuration for how long the current sprite player has been used
var cycleDir  = 1;

var leftWall  = 0;
var rightWall = 1000;

var canvas    = document.getElementById("canvas");
var ctx       = canvas.getContext("2d");

export var player = new Image(); //document.getElementById("$player$");
player.src        = "sprites/Idle.png";

player.addEventListener("load", function(){
    ctx.drawImage(player, pLeft, pTop, pDim, pDim);
});

function getNextSprite() {
    var curr        = player.src;
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

export function moveSprite(event){
    if (ckd) return;
    ckd = event.key;

    if (intervals.length > 0) return;

    var inc = dirs[ckd];
    if (!inc) {
        ckd = null;
        return;
    }

    var m = setInterval(function () {
        var _new = pLeft + (inc*2);

        //if (boundsCheck(new)) then:
        pLeft = _new;
        //else: stopSprite(event);

        canvas.width = canvas.width;

        player.src = getNextSprite();

        ctx.drawImage(player, pLeft, pTop, pDim, pDim);


    }, 20);

    intervals.push(m);
}

export function stopSprite(event){
    if (event.key == ckd){
        for (var i=intervals.length-1; i>-1; i--){
            clearInterval(intervals[i]);
            intervals.pop();
        }
        ckd = null;
    }
}
