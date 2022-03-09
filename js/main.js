import * as sprites from "./modules/spriteController.js";
//var sprites = require("./modules/spriteController");

document.addEventListener('keydown', sprites.moveSprite);
document.addEventListener('keyup',   sprites.stopSprite);
