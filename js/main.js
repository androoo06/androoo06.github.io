// main file hopefully

var moving   = false;

var canvas   = document.getElementById("$canvas");
var context  = canvas.getContext("2d");

var sprites  = {};
sprites.Idle = document.getElementById("player$idle");

sprites.Idle.addEventListener('load', function(){
    //
}, false);

canvas.addEventListener('mouseenter', function(){
    alert("hello");
}, false);

function moveSprite(event) {
    var key = event.key;
    if (key != "a" && key != "d") {
        alert(">" + key + "<");
        return;
    }


}

document.addEventListener('keydown', moveSprite);