export class Entity {
    constructor(width, height, x, y) {
        this.pX        = x;
        this.pY        = y;
        this.width     = width;
        this.height    = height;

        drawBoundsBox();
    }

    // tried making private but didn't work (doesnt rly matter much either way in this case)
    drawBoundsBox() {
        // leftBound, rightBound, bottomBound, topBound
        this.boundsBox = {
            "left":    this.pX,
            "right":  (this.pX + this.width),
            "bottom": (this.pY + this.height),
            "top":     this.pY
        };
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
        drawBoundsBox();
    }

    // change size to (width, height)
    resize(width, height) {
        this.width  = width;
        this.height = height;
        drawBoundsBox();
    }
}
