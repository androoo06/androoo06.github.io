////  MAIN  ////

// canvas exports
export var canvas = document.getElementById("canvas");
export var ctx    = canvas.getContext("2d");

// imports
import * as sprites from "./modules/spriteController.js";
import * as MAP     from "./modules/collisionMap.js";

// events
document.addEventListener('keyup',   sprites.stopSprite);
document.addEventListener('keydown', sprites.moveSprite);
