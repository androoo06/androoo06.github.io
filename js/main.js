// main file hopefully

var moving  = false;

var canvas  = document.querySelector('canvas');
var context = canvas.getContext('2d');

var sprites = {
    Idle = new Image(128, 128),
};

sprites.Idle.src         = "sprites/Person.png";
sprites.Idle.crossOrigin = true
sprites.Idle.onload = function() {
    context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
    );
};


function moveSprite(event) {
    var key = event.key;
    if (key != 'w' && key != 'a' && key == 's' && key != 'd'){
        return;
    }



}

document.addEventListener('keydown', moveSprite);