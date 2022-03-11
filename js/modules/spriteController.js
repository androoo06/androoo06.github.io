////  Sprite Controller  ////

// imports
import {boundsCheck} from "./collisionMap.js";
import {canvas, ctx, FILL_BOUNDING_BOXES as showBoxes} from "./constants.js";
import {_entities as objs, player, plrDim as pDim} from "./dailyEntities.js";

// player stuff
var prevX     = player.pX;
var prevY     = player.pY;

// misc
var dirs      = {
  "a": -1,
  "d":  1,
  "ArrowRight": 1,
  "ArrowLeft": -1
}
var moving    = {};
var interval  = null;
var cycleDir  = 1;
var moveX_inc = 0;
var jumps     = {
    "up":  -1, // negative is up, positive is down
    "down": 1
}
var jumpDir   = 0;
var maxJump   = 85; // max jump height [should be around sprite size, maybe more (like 125-150)]

function updateCanvas(){
    ctx.clearRect(prevX, prevY, pDim.x, pDim.y);
    player.draw();
}

function getNextSprite() {
    if (jumpDir != 0) return "sprites/Jump.png";

    var fullSrc     = player.Image.src;
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
        //console.log("moveX_inc:"+moveX_inc);

        var newX  = player.pX + moveX_inc;
        var bound = boundsCheck(newX, player.pY, pDim.x, pDim.y);

        if (bound) {
            prevX            = player.pX;
            player.pX        = newX;

            // if won't collide with anything below it [and not jumping]:
            if (boundsCheck(newX, player.pY+2, pDim.x, pDim.y) && (jumpDir==0)){
                jump(jumps.down); // gravity effect
            }

            player.Image.src = (jumpDir != 0) ? player.Image.src : ( (moveX_inc == 0) ? "sprites/Idle.png" : getNextSprite() ); // nested ternary; kinda gross (just saying to not change if jumping, and set to idle if moveInc is 0)

            updateCanvas();
        } else {
            stopSprite(event);
        }
    }, 15);
}

function jump(override) {
    jumpDir = override || jumps.up;

    player.Image.src = "sprites/Jump.png";
    var ogY      = player.pY;
    var interval = setInterval(function() {
        var newY = player.pY + (jumpDir*2);
        var bound = boundsCheck(player.pX, newY, pDim.x, pDim.y);

        if (bound) {
            prevY     = player.pY;
            player.pY = newY;
            updateCanvas();
        } else {
            jumpDir = (jumpDir == jumps.up) ? jumps.down : 0;
        }

        if (jumpDir == 0){
            clearInterval(interval);
            player.Image.src = "sprites/Idle.png";
        } else if (player.pY <= (ogY - maxJump)) {
            jumpDir = jumps.down;
        }

    }, 15);
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

        if (jumpDir == 0){
            player.Image.src = "sprites/Idle.png";
        }
        updateCanvas();
    }
}
