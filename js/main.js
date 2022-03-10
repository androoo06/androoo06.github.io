////  MAIN  ////

// imports
import * as sprites from "./modules/spriteController.js";
import * as MAP     from "./modules/collisionMap.js";

// canvas stuff
var canvas = document.getElementById("canvas");
var ctx    = canvas.getContext("2d");

// events
document.addEventListener('keyup',   sprites.stopSprite);
document.addEventListener('keydown', sprites.moveSprite);
