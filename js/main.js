// main file hopefully

var moving   = false;

var canvas   = document.getElementById('$canvas');
var context  = canvas.getContext('2d');

var sprites  = {};
sprites.Idle = document.getElementById("player$idle");

sprites.Idle.onload = function() {
    canvas.drawImage(sprites.Idle, 128, 128);
}

function moveSprite(event) {
    var key = event.key;
    if (key != 'a' && key != 'd') {
        alert(">" + key + "<");
        return;
    }


}

document.addEventListener('keydown', moveSprite);