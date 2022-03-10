export class Entity {
    constructor(width, height, x, y) {
        this.pX        = x;
        this.pY        = y;
        this.width     = width;
        this.height    = height;

        this.drawBoundsBox();
    }

    // private method to update this.boundsBox when properties are changed
    #drawBoundsBox(x, y) {
        // leftBound, rightBound, bottomBound, topBound
        this.boundsBox = [pX, pX+width, pY+height, pY];
    }

    // return whether (x, y) is in object bounds (would cause overlap)
    isInBounds(x, y) {
        var bb = this.boundsBox;
        return (x >= bb[0]) && (x <= bb[1]) && (y <= bb[2]) && (y >= bb[3]);
    }

    // change position to (newX, newY)
    shift(newX, newY) {
        this.pX = newX;
        this.pY = newY;
        this.drawBoundsBox();
    }

    // change size to (width, height)
    resize(width, height) {
        this.width  = width;
        this.height = height;
        this.drawBoundsBox();
    }
}
