////  Daily Entities  ////

// imports
import {Entity} from "./entity.js";
import {canvas} from "./constants.js";

function _load(element){
    element.draw();
    //element.removeEventListener("load", _load, element);
}

// player [always will be here]

var _player = new Image();
_player.src = "sprites/Idle.png";

export var plrDim = 64; // png should be 200x200 or smaller (to be rendered non-pixely); actual render is 64x64
export var player = new Entity(0, (canvas.height - plrDim), plrDim, plrDim, "Player", _player);

_player.addEventListener("load", _load, player);

// daily entities [ syntax: new Entity(posX, posY, sizeX, sizeY, name, imageObject); ]
///// ------------------------------------------------------------------------------------------------------------------ /////

//-- bar --//
var _bar = new Image(50, 10);
_bar.src = "entities/Bar.png";

var bar = new Entity(0, (canvas.height - 200), 50, 10, "Bar", _bar);
_bar.addEventListener("load", _load, bar);
// -- /// --//

///// ------------------------------------------------------------------------------------------------------------------ /////

// exports
export var _screen   = new Entity(0, 0, canvas.width, canvas.height, "Screen");
export var _entities = [bar];
