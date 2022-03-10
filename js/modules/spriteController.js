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
  "ArrowRight": 1
  "ArrowLeft": -1
}
var moving    = {};
var interval  = null;
var cycleDir  = 1;
var jumpDir   = 0;
var maxJump   = 50;
var moveX_inc = 0;

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

function move(event) {
    return setInterval(function() {
        console.log("moveX_inc:"+moveX_inc);

        var newX  = pX + moveX_inc;
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
    var key = event.key;

    if (key == " ") {
        if (jumpDir) return;
        jump();      return;
    }

    if (moving[key]) return;
    if (!dirs[key])  return;

    moving[key] = true;
    moveX_inc += (dirs[key]*2);

    if (!interval){
        interval = move(event);
    }
}

export function stopSprite(event){
    var key = event.key;
    var inc = moving[key];

    if (inc) {
        moving[key] = null;
        moveX_inc  -= (dirs[key]*2);
    }

    if (moveX_inc == 0){
        clearInterval(interval);
        interval   = null;

        player.src = "sprites/Idle.png";
        updateCanvas();
    }
}
