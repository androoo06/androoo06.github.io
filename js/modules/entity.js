export class Entity {
    // private method to update this.boundsBox when properties are changed
    #drawBoundsBox() {
        // leftBound, rightBound, bottomBound, topBound
        this.boundsBox = {
            "left":    this.pX,
            "right":  (this.pX + this.width),
            "bottom": (this.pY + this.height),
            "top":     this.pY
        };
    }

    constructor(width, height, x, y) {
        this.pX        = x;
        this.pY        = y;
        this.width     = width;
        this.height    = height;

        this.#drawBoundsBox();
    }

    // return whether (x, y) is in object bounds (would cause overlap)
    isInBounds(x, y) {
        var bb = this.boundsBox;
        return (x >= bb.left) && (x <= bb.right) && (y <= bb.bottom) && (y >= bb.top);
    }

    // change position to (newX, newY)
    shift(newX, newY) {
        this.pX = newX;
        this.pY = newY;
        this.#drawBoundsBox();
    }

    // change size to (width, height)
    resize(width, height) {
        this.width  = width;
        this.height = height;
        this.#drawBoundsBox();
    }
}
