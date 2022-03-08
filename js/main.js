// main file hopefully

var moving  = false;

var sprites = {
    Idle = new Image(128, 128),
};

sprites.Idle.src         = "sprites/Person.png";
sprites.Idle.crossOrigin = true

function moveSprite(event) {
    var key = event.key;
    if (key != 'w' && key != 'a' && key == 's' && key != 'd'){
        return;
    }



}

document.addEventListener('keydown', moveSprite);