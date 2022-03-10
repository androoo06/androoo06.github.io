////  Collision Map  ////

import {Entity} from "./entity.js";

// canvas stuff [defined like this in all scripts thus far]
var canvas  = document.getElementById("canvas");
var ctx     = canvas.getContext("2d");

var plrDim  = 64; // probably should be an import

var _screen = new Entity(0, 0, (canvas.width - plrDim), canvas.height);

var objs    = [];

export function boundsCheck(x, y){
    if (!_screen.isInBounds(x, y)){
        return false;
    }

    for (var i = 0; i < objs.length; i++){
        if (objs[i].isInBounds(x, y)){
            return false;
        }
    }

    return true;
}
