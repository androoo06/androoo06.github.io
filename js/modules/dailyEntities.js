////  Daily Entities  ////

// imports
import {Entity} from "./entity.js";
import {canvas} from "./constants.js";

// template for entities [WITH images] ** entities without images (sole collision boxes) should be made directly with the Entity constructor
function _setup(name, src, posX, posY, sizeX, sizeY){
    var _element = new Image();
    _element.src = src;

    //console.log("setting up for: "+name+" "+src+" "+posX+" "+posY+" "+sizeX+" "+sizeY);

    var element = new Entity(posX, posY, sizeX, sizeY, name, _element);
    _element.addEventListener("load", function(){
        element.draw(); // i can't simplify this to "element.draw" ;; tried and it doesn't work the same [[only does if the function is local]]
    });

    return element;
}

// player [always will be here]
export var plrDim = {"x": 64, "y":64};
export var player = _setup("Player", "sprites/Idle.png", 0, (canvas.height - plrDim.y), plrDim.x, plrDim.y);

// daily entities [ syntax: _setup(name, src, posX, posY, sizeX, sizeY); ]
///// ------------------------------------------------------------------------------------------------------------------ /////

var bar = _setup("Bar", "entities/Bar.png", 150, (canvas.height - 50), 50, 10);


///// ------------------------------------------------------------------------------------------------------------------ /////

// exports
export var _screen   = new Entity(0, 0, canvas.width, canvas.height, "Screen");
export var _entities = [bar]; // these entities are [COLLIDABLE], and have images
