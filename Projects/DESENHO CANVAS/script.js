//* Web elements 

let weColors = document.querySelectorAll('.color');
let weScreen = document.querySelector('#tela');
let weClearButton = document.querySelector('button.clear');

//* Initial variables

let context = weScreen.getContext('2d');
let canDraw = false;
let mouseX = 0; 
let mouseY = 0; 

//* Events

weColors.forEach( cor => cor.addEventListener('click', selectColor) );
weScreen.addEventListener('mousedown', mouseDown);
weScreen.addEventListener('mousemove', mouseMove);
weScreen.addEventListener('mouseup', mouseUp);
weClearButton.addEventListener('click', clearScreen);

//* functions

function selectColor(event){
    let weColorActive = document.querySelector('.color.active');
    weColorActive.classList.remove('active');
    event.target.classList.add('active');
}

function mouseDown(event){
    canDraw = true;
    mouseX = event.pageX - weScreen.offsetLeft;
    mouseY = event.pageY - weScreen.offsetTop;
}

function mouseMove(event){
    if(canDraw){
        draw(event.pageX, event.pageY);
    }
}

function mouseUp(){
    canDraw = false;
}

function draw(x, y){
    weColorActive = document.querySelector('.color.active');
    let selectedColor = weColorActive.getAttribute('data-color');

    let axleX = x - weScreen.offsetLeft;
    let axleY = y - weScreen.offsetTop;

    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(axleX, axleY);
    context.closePath()
    context.strokeStyle = selectedColor;
    context.stroke();

    mouseX = axleX;
    mouseY = axleY;
}

function clearScreen(){
    context.transform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}