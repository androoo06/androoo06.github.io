////  Collision Map  ////
import {_entities as objs, _screen} from "./dailyEntities.js";
import {newBoundsBox}               from "./entity.js";

function overlapping(b1, b2) {
    //console.log(b1, b2);

    var overlap = true;

    // If one rectangle is on left side of other
    if (b1.left >= b2.right || b2.left >= b1.right){
        //console.log("c1;"+(b1.left > b2.right)+"-"+(b2.left > b1.right));
        overlap = false;
    }

    // If one rectangle is above other
    if (b1.bottom <= b2.top || b2.bottom <= b1.top){
        //console.log("c2;"+(b1.bottom < b2.top)+(b2.bottom < b1.top));
        overlap = false;
    }

    return overlap;
}

export function boundsCheck(x, y, sizeX, sizeY){
    var b2 = newBoundsBox(x, y, sizeX, sizeY);

    if (!_screen.contains(x, y, sizeX, sizeY)){
        return false;
    }

    for (var i = 0; i < objs.length; i++){
        //alert(objs[i]._Name);
        var b1 = objs[i].boundsBox;
        if (overlapping(b1, b2)) {
            return false;
        }
    }

    return true;
}
