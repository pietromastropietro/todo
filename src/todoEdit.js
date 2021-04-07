import { todoDatabase } from './global';

const overlay = document.querySelector('.overlay');

function addEditEvents() {
    const editTitle = document.querySelectorAll('.todoTitle');
    editTitle.forEach((title) => {
        title.addEventListener('click', editTodo);
    });

    const editDescription = document.querySelectorAll('.todoDescription');
    editDescription.forEach((description) => {
        description.addEventListener('click', editTodo);
    });

}

let elementToEdit;

function editTodo(e) {
    //console.log(e);

    // TODO: find a way to pass this object to hideOverlay 
    // without having to make it as global variable
    elementToEdit = {
        name: e.srcElement.className,
        par: e.srcElement.parentElement,
        id: e.srcElement.parentElement.id,
    }

    showOverlay();

    overlay.addEventListener('click', hideOverlay);

}


function showOverlay() {
    overlay.style.display = 'flex';

}

function hideOverlay() {

    overlay.style.display = 'none';

    //const pare = document.querySelector('#n3 > div.todoTitle');
    const pare = document.querySelector('#' + elementToEdit.id + '>' + '.' + elementToEdit.name)
    // console.log(elementToEdit.id);

    const index = todoDatabase.map(function (e) {
        return e.todoId;
    }).indexOf(elementToEdit.id);

    // console.log(index);

    const elem = elementToEdit.name.slice(4).toLowerCase();
    // console.log(elem);

    todoDatabase[index][elem] = pare.innerHTML;

    // console.table(todoDatabase);


}

export default addEditEvents;