// main file hopefully

function moveSprite(event) {
    var key = event.key;
    if (key != 'w' && key != 'a' && key == 's' && key != 'd'){
        return;
    }

    

}

document.addEventListener('keydown', moveSprite);