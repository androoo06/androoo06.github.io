////  Entity Class  ////

import {canvas, ctx} from "./constants.js";

function overlapping(b1, b2){
    console.log(b1, b2);

    // If one rectangle is on left side of other
    if (b1.left > b2.right || b2.left > b1.right){
        console.log("c1;"+(b1.left > b2.right)+"-"+(b2.left > b1.right));
        return false;
    }

    // If one rectangle is above other
    if (b1.bottom > b2.top || b2.bottom > b1.top){
        console.log("c2;"+(b1.bottom > b2.top)+(b2.bottom > b1.top));
        return false;
    }

    return true;
}

function newBoundsBox(x, y, width, height){
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
    draw() {
        ctx.drawImage(this.Image, this.pX, this.pY, this.width, this.height);
    }

    // return whether (x, y) is in object bounds (would cause overlap)
    isInBounds(x, y, sizeX, sizeY) {
        var bb1 = this.boundsBox;
        var bb2 = newBoundsBox(x, y, sizeX, sizeY);

        return overlapping(bb1, bb2);
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
