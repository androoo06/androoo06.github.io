////  Collision Map  ////

import Entity as entity from "./entity.js";

// canvas stuff [defined like this in all scripts thus far]
var canvas  = document.getElementById("canvas");
var ctx     = canvas.getContext("2d");

var _screen = new entity(canvas.width, canvas.height, 0, 0);

var objs    = []

export function boundsCheck(x, y){
    if (!_screen.isInBounds(x, y)) return false;

    for (var i = 0; i < objs.length; i++){
        if (objs[i].isInBounds(x, y)) return false;
    }

    return true;
}
