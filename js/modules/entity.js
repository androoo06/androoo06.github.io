////  Entity Class  ////

import {canvas, ctx, FILL_BOUNDING_BOXES as showBoxes} from "./constants.js";

export function newBoundsBox(x, y, width, height){
    return {
        "left":    x,
        "right":  (x + width),
        "bottom": (y + height),
        "top":     y
    };
}

// didn't work as a private or public method of the class so I had to pull it out altogether.
function drawBoundsBox(entity, onlyBB) {
    // leftBound, rightBound, bottomBound, topBound
    if (!onlyBB && entity.Image){
        entity.draw();
    }

    return newBoundsBox(entity.pX, entity.pY, entity.width, entity.height);
}

export class Entity {
    constructor(x, y, width, height, name, image) {
        this.width     = width;
        this.height    = height;
        this.pX        = x;
        this.pY        = y;
        this._Name     = name;

        if (image) {
            this.Image = image;
        } else {
            console.log("no src for "+x+" "+y+" "+width+" "+height);
        }

        this.boundsBox = drawBoundsBox(this, true);
    }

    // draws the object on-screen (with the current canvas + context)
    draw(){
        console.log("calling draw for: " + this._Name);
        if (showBoxes){
            ctx.fillRect(this.pX, this.pY, this.width, this.height);
        } else {
            ctx.drawImage(this.Image, this.pX, this.pY, this.width, this.height);
        }
    }

    // checks if the x and y are ENTIRELY inside of the boundsBox
    contains(x, y, sizeX, sizeY){
        var bb = this.boundsBox;

        // if not in the horizontal containment
        if ((x < bb.left) || (x > bb.right)){
            return false;
        }

        // if not in the vertical containment
        if ((y > bb.bottom) || (y < bb.top)){
            return false;
        }

        // if it extends outside of the borders [only need to check these since images are all drawn the same]
        if((x+sizeX > bb.right) || (y+sizeY > bb.bottom)){
            return false;
        }

        return true;
    }

    // change position to (newX, newY)
    shift(newX, newY) {
        if (this.Image) ctx.clearRect(this.pX, this.pY, this.width, this.height);

        this.pX        = newX;
        this.pY        = newY;
        this.boundsBox = drawBoundsBox(this);
    }

    // change size to (width, height)
    resize(width, height) {
        if (this.Image) ctx.clearRect(this.pX, this.pY, this.width, this.height);

        this.width     = width;
        this.height    = height;
        this.boundsBox = drawBoundsBox(this);
    }
}
