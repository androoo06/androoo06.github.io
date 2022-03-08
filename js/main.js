// main file hopefully

var moving  = false;

var canvas  = document.getElementById('$canvas');
var context = canvas.getContext('2d');

var _sprites = {
    Idle = new Image(128, 128),
};

_sprites.Idle.src         = "sprites/Person.png";
_sprites.Idle.crossOrigin = true;
_sprites.Idle.onload = function() {
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
    if (key != 'a' && key != 'd'){
        alert(key);
        return;
    }


}

document.addEventListener('keydown', moveSprite);