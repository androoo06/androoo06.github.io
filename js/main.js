import * as sprites from "./modules/spriteController.js";

document.addEventListener('keydown', sprites.moveSprite);
document.addEventListener('keyup',   sprites.stopSprite);
