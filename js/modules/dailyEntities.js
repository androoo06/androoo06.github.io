////  Daily Entities  ////

import {Entity} from "./entity.js";
import {canvas} from "./spriteController.js";


// canvas stuff [defined like this in all scripts thus far]
//var canvas  = document.getElementById("canvas");
//var ctx     = canvas.getContext("2d");

var plrDim  = 64; // probably should be an import

// daily entities
var bar = new Entity(0, (10), 50, 10, "sprites/Idle.png");//"entities/Bar.png");

// exports

// new Entity(posX, posY, sizeX, sizeY);
export var _screen   = new Entity(0, 0, (canvas.width - plrDim), canvas.height);
export var _entities = [bar];
