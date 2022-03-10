// didn't work as a private or public method of the class so I had to pull it out altogether.
function drawBoundsBox(pX, pY, width, height) {
    // leftBound, rightBound, bottomBound, topBound
    return {
        "left":    pX,
        "right":  (pX + width),
        "bottom": (pY + height),
        "top":     pY
    };
}

export class Entity {
    constructor(x, y, width, height) {
        this.width     = width;
        this.height    = height;
        this.pX        = x;
        this.pY        = y;

        this.boundsBox = drawBoundsBox(x, y, width, height);
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
        this.boundsBox = drawBoundsBox(newX, newY, this.width, this.height);
    }

    // change size to (width, height)
    resize(width, height) {
        this.width     = width;
        this.height    = height;
        this.boundsBox = drawBoundsBox(this.pX, this.pY, width, height);
    }
}
