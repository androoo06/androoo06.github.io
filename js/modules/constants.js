// canvas stuff
export var canvas = document.getElementById("canvas");
export var ctx    = canvas.getContext("2d");

// player stuff
export var plrDim = 64; // png should be 200x200 or smaller (to be rendered non-pixely); actual render is 64x64
export var player = new Image();
player.src        = "sprites/Idle.png";

// daily entities

/*
var test = new Image();
test.src = "entities/Bar.png";

test.addEventListener("load", function(){
    canvas.width = canvas.width;
    ctx.drawImage(test, 0, 50, 50, 10);
});
*/
