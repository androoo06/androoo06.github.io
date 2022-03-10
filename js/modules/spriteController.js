////  Sprite Controller  ////

// imports
import * as MAP from "./collisionMap.js";

// canvas stuff
var canvas    = document.getElementById("canvas");
var ctx       = canvas.getContext("2d");

// player stuff
var pDim      = 64 // image size (in the canvas, png should be 200x200)
var pX        = 0;
var pY        = canvas.height - pDim;

export var player = new Image();
player.src        = "sprites/Idle.png";
player.addEventListener("load", updateCanvas);

// misc
var dirs      = {
  "a": -1,
  "d":  1
}
var intervals = [];
var ckd       = null; // current key down
var cycleDir  = 1;
var jumpDir   = 0;
var maxJump   = 50;

function updateCanvas(){
    canvas.width = canvas.width; // ngl idk what this does but it bugs without it
    ctx.drawImage(player, pX, pY, pDim, pDim);
}

function getNextSprite() {
    if (jumpDir) return;

    var fullSrc     = player.src;
    var localSrcIdx = fullSrc.search("sprites/");
    var localSrc    = fullSrc.substring(localSrcIdx);

    if (localSrc == "sprites/Idle.png") {
        return "sprites/walk0.jpg";
    }

    var walkNum    = parseInt(localSrc.substring(12));
    if (!isNaN(walkNum)) {
        cycleDir = (walkNum == 0) ?  1 : cycleDir;
        cycleDir = (walkNum == 3) ? -1 : cycleDir;

        var newWalk  = (walkNum + cycleDir);

        //console.log(newWalk);

        return "sprites/walk"+ (newWalk) +".jpg";
    }
}

function move(incX) {
    return setInterval(function() {
        var newX = pX + (incX*2);

        var bound = MAP.boundsCheck(newX, pY);
        if (bound) {
            // maybe do something with bound (but prob not)
            pX = newX;
            player.src = (jumpDir) ? player.src : getNextSprite();
            updateCanvas();
        } else {
            stopSprite(event);
        }
    }, 20);
}

function jump() {
    jumpDir = -1; // negative is up, positive is down

    player.src   = "sprites/Jump.png";
    var ogY      = pY;
    var interval = setInterval(function() {
        var newY = pY + (jumpDir*2);

        var bound = MAP.boundsCheck(newY, pX);
        if (bound) {
            pY = newY;
            updateCanvas();
        } else {
            jumpDir = (jumpDir == -1) ? 1 : 0;
        }

        if (pY < (ogY - maxJump)){
            jumpDir = 1;
            player.src = "sprites/Idle.png";
        }

        if (pY == ogY){
            clearInterval(interval);
            jumpDir = 0;
        }
    }, 20);
}

export function moveSprite(event) {
    if (ckd) return;
    if (intervals.length > 0) return;

    ckd      = event.key;
    var incX = dirs[ckd];
    if (!incX) {
        ckd = null;
    }
    if (event.key === " ") {
        if (jumpDir) return;
        jump();      return;
    }

    var m = move(incX);
    intervals.push(m);
}

export function stopSprite(event){
    if (event.key == ckd){
        ckd = null;

        for (var i=intervals.length-1; i>-1; i--){
            clearInterval(intervals[i]);
            intervals.pop();
        }

        player.src = "sprites/Idle.png";
        updateCanvas();
    }
}
