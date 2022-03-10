// Sprite Controller

import * as MAP from "./collisionMap.js";

var dirs      = {
  "a": [-1, 0],
  "d": [1,  0]
}

var intervals = [];
var ckd       = null; // current key down

var pDim      = 64 // image size (in the canvas, png should be 200x200)

var pX        = 0;
var pY        = 0;

var cycleDir  = 1;

var canvas    = document.getElementById("canvas");
var ctx       = canvas.getContext("2d");

export var player = new Image();
player.src        = "sprites/Idle.png";

player.addEventListener("load", updateCanvas);

function updateCanvas(){
    //alert(pX+" "+pY);
    canvas.width = canvas.width; // ngl idk what this does but it bugs without it
    ctx.drawImage(player, pX, pY, pDim, pDim);
}

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

        //console.log(newWalk);

        return "sprites/walk"+ (newWalk) +".jpg";
    }
}

export function moveSprite(event) {
    if (ckd) return;
    ckd = event.key;

    if (intervals.length > 0) return;

    var inc = dirs[ckd];

    if (!inc) {
        ckd = null;
        return;
    }
    var incX = inc[0];
    var incY = inc[1];

    alert(incX + "x" + incY + ":" + pX + "x" + pY);

    var m = setInterval(function() {
        var newX = pX + (incX*2);
        var newY = pY + (incY*2);

        var a = MAP.boundsCheck(newX, newY);
        alert(a);
        if (a) {
            pX = newX;
            pY = newY;

            player.src = getNextSprite();
            updateCanvas();
        } else {
            stopSprite(event);
        }
    }, 20);

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
