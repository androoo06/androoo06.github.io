////  Daily Entities  ////

// imports
import {Entity} from "./entity.js";
import {canvas, plrDim} from "./constants.js";

// daily entities [ syntax: new Entity(posX, posY, sizeX, sizeY); ]

//-- bar --//
var bar  = new Image();
bar.src  = "entities/Bar.png";

var _bar = new Entity(150, (canvas.height - 30), 50, 10, "Bar", bar);
bar.addEventListener("load", function(){
    _bar.draw();
});

// exports
export var _screen   = new Entity(0, 0, canvas.width, canvas.height, "Screen");
export var _entities = [_bar];
