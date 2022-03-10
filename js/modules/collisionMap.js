////  Collision Map  ////
import {_entities as objs, _screen} from "./dailyEntities.js";

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
