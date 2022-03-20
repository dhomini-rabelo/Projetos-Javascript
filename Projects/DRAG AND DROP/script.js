// event.target -> onde clicou  -----  event.currentTarget -> o we q está sendo monitorado

//* Web Elements

let weItens = document.querySelectorAll('.item');
let weAreas = document.querySelectorAll('.area');
let weItensArea = document.querySelector('.neutralArea')

//* Initial variables

let areas = {a: null, b: null, c: null};

//* Events

weItens.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

weAreas.forEach(area => {
    area.addEventListener('dragover', dragOver); // sempre que o item arrasta passar por cima do item no caso .area
    area.addEventListener('dragleave', dragLeave); // quando sai (dps de entrar) do .area
    area.addEventListener('drop', drop);
});

weItensArea.addEventListener('dragover', dragOverItensArea); 
weItensArea.addEventListener('dragleave', dragLeaveItensArea); 
weItensArea.addEventListener('drop', dropItensArea);

//* Functions item

function dragStart(event){
    event.currentTarget.classList.add('dragging');
}

function dragEnd(event){
    event.currentTarget.classList.remove('dragging');
}

//* Functions area

function dragOver(event){
    if (event.currentTarget.querySelector('.item') === null){
        event.preventDefault();
        event.currentTarget.classList.add('hover');
    }
}

function dragLeave(event){
    event.currentTarget.classList.remove('hover');
}

function drop(event){
    event.currentTarget.classList.remove('hover');
    if (event.currentTarget.querySelector('.item') === null){
        let draggedItem = document.querySelector('.item.dragging');
        event.currentTarget.appendChild(draggedItem);
        updateAreas();
    }
}

function dragOverItensArea(event){
    event.preventDefault();
    event.currentTarget.classList.add('hover');
}

function dragLeaveItensArea(event){
    event.currentTarget.classList.remove('hover');
}

function dropItensArea(event){
    event.currentTarget.classList.remove('hover');
    let draggedItem = document.querySelector('.item.dragging');
    event.currentTarget.appendChild(draggedItem);
    updateAreas();
}

function updateAreas(){
    for (let i = 0; i < 3; i++ ){
        let name = weAreas[i].getAttribute('data-name');
        if (weAreas[i].querySelector('.item') !== null){
            areas[name] = weAreas[i].querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    }
    if (areas.a == '1' && areas.b == '2' && areas.c == '3'){
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}
