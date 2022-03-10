////  MAIN  ////

// imports
import * as sprites  from "./modules/spriteController.js";
import * as MAP      from "./modules/collisionMap.js";
import {canvas, ctx} from "./modules/constants.js";

// events
document.addEventListener('keyup',   sprites.stopSprite);
document.addEventListener('keydown', sprites.moveSprite);
