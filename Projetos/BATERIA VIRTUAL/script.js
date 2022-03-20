//* Web Elements
let weInput = document.querySelector('.composer input');
let weButton = document.querySelector('.composer button');

//* Events

document.body.addEventListener('keyup', keyUp);
weButton.addEventListener('click', composer);

//* Functions
// event.code retorna tecla clicada
function keyUp(event){
    let keyPressed = event.code.toLowerCase();
    playSound(keyPressed);
}

function playSound(sound){
    let weAudio = document.querySelector(`#s_${sound}`);
    let weKeyPressed = document.querySelector(`div[data-key="${sound}"]`);
    if (weAudio){ 
    weAudio.currentTime = 0;
    weAudio.play(); 
    weKeyPressed.classList.add('active');
    setTimeout(()=> weKeyPressed.classList.remove('active'), 400);
    }
}

function composer(){
    let compose = weInput.value;
    let music = compose.split('');
    let musicKeyboardKeys = {a: 'keya', s: 'keys', d: 'keyd', q: 'keyq', w: 'keyw', e : 'keye', z: 'keyz', x: 'keyx', c: 'keyc'};
    wait = 0;
    for (let c in music){
        if (music[c] in musicKeyboardKeys){
            setTimeout( () => {playSound(musicKeyboardKeys[music[c]])}, wait);
        }
        wait += 250;
    }
}