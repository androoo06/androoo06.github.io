////  Daily Entities  ////

// imports
import {Entity} from "./entity.js";
import {canvas} from "./constants.js";

// template for entities
function _setup(name, src, posX, posY, sizeX, sizeY){
    var _element = new Image();
    _element.src = src;

    console.log("setting up for: "+name+" "+src+" "+posX+" "+posY+" "+sizeX+" "+sizeY);

    var element = new Entity(posX, posY, sizeX, sizeY, name, _element);
    _element.addEventListener("load", element.draw);

    return element;
}

// player [always will be here]
export var player = _setup("Player", "sprites/Idle.png", 0, (canvas.height - plrDim), plrDim, plrDim);
export var plrDim = 64; // png should be 200x200 or smaller (to be rendered non-pixely); actual render is 64x64


// daily entities [ syntax: _setup(name, src, posX, posY, sizeX, sizeY); ]
///// ------------------------------------------------------------------------------------------------------------------ /////

var bar = _setup("Bar", "entities/Bar.png", 0, (canvas.height - 200), 50, 10);


///// ------------------------------------------------------------------------------------------------------------------ /////

// exports
export var _screen   = new Entity(0, 0, canvas.width, canvas.height, "Screen");
export var _entities = [bar];
