////  Collision Map  ////
import {_entities as objs, _screen} from "./dailyEntities.js";

export function boundsCheck(x, y, sizeX, sizeY){
    if (!_screen.isInBounds(x, y, sizeX, sizeY)){
        return false;
    }

    for (var i = 0; i < objs.length; i++){
        //alert(objs[i]._Name);
        if (objs[i].isInBounds(x, y, sizeX, sizeY)){
            alert('!');
            return false;
        }
    }

    return true;
}
