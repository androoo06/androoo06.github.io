////  Entity Class  ////

// canvas stuff
//var canvas = document.getElementById("canvas");
//var ctx    = canvas.getContext("2d");
import {canvas, ctx} from "./spriteController.js";

// didn't work as a private or public method of the class so I had to pull it out altogether.
function drawBoundsBox(entity, onlyBB) {
    // leftBound, rightBound, bottomBound, topBound
    if (!onlyBB){
        entity.draw();
    }

    return {
        "left":    entity.pX,
        "right":  (entity.pX + entity.width),
        "bottom": (entity.pY + entity.height),
        "top":     entity.pY
    };
}

export class Entity {
    constructor(x, y, width, height, src) {
        this.width     = width;
        this.height    = height;
        this.pX        = x;
        this.pY        = y;

        this.Image     = new Image();
        this.Image.src = src || "_NoImgProvided";
        if (src){
            alert(src);
            this.Image.addEventListener("load", this.draw);
        }

        this.boundsBox = drawBoundsBox(this, false);
    }

    // draws the object on-screen (with the current canvas + context)
    draw() {
        if (this.Image.src.search("_NoImgProvided") == -1){
            canvas.width = canvas.width;
            ctx.drawImage(this.Image, this.pX, this.pY, this.width, this.height);
        }
    }

    // return whether (x, y) is in object bounds (would cause overlap)
    isInBounds(x, y) {
        var bb = this.boundsBox;
        return (x >= bb.left) && (x <= bb.right) && (y <= bb.bottom) && (y >= bb.top);
    }

    // change position to (newX, newY)
    shift(newX, newY) {
        this.pX        = newX;
        this.pY        = newY;
        this.boundsBox = drawBoundsBox(this);
    }

    // change size to (width, height)
    resize(width, height) {
        this.width     = width;
        this.height    = height;
        this.boundsBox = drawBoundsBox(this);
    }
}
