import { todoDatabase } from './global';
import deleteTodo from './todoDelete';

const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', hideOverlay);

function addEditEvents() {
    // const editTitle = document.querySelectorAll('.todoTitle');
    // editTitle.forEach((title) => {
    //     title.addEventListener('click', editTodo);
    // });

    // const editDescription = document.querySelectorAll('.todoDescription');
    // editDescription.forEach((description) => {
    //     description.addEventListener('click', editTodo);
    // });

    // const editDate = document.querySelectorAll('.todoDate');
    // editDate.forEach((date) => {
    //     date.addEventListener('click', editTodo);
    // });
    

    document.querySelectorAll('.todoTitle, .todoDescription, .todoDate').forEach(item => {
        item.addEventListener('click', editTodo);
    });
    
    document.querySelectorAll('.todoDeleteBtn').forEach(itemm => {
        itemm.addEventListener('click', deleteTodo);
    });

}

let elementToEdit;

function editTodo(e) {
    console.log('test');
    //console.log(e);

    // TODO: find a way to pass this object to saveEdit 
    // without having to make it as global variable
    elementToEdit = {
        name: e.srcElement.className,
        par: e.srcElement.parentElement,
        id: e.srcElement.parentElement.id,
    }

    dateEdit();

    showOverlay();
}
function dateEdit() {
    const datee = document.querySelector('#' + elementToEdit.id + '>' + '.todoDate');
    const newInput = document.createElement('input');
    newInput.type = 'date';
    newInput.classList = 'todoDate';
    datee.replaceWith(newInput);
}


function showOverlay() {
    overlay.style.display = 'flex';

    const el = document.querySelector('#' + elementToEdit.id);
    el.classList = 'todoElement edit';
}

function hideOverlay() {
    overlay.style.display = 'none';

    saveEdit();
}

function saveEdit () {
    const titlee = document.querySelector('#' + elementToEdit.id + '>' + '.todoTitle');
    const descr = document.querySelector('#' + elementToEdit.id + '>' + '.todoDescription')

    const index = todoDatabase.map(function (e) {
        return e.todoId;
    }).indexOf(elementToEdit.id);

    todoDatabase[index].title = titlee.innerHTML;
    todoDatabase[index].description = descr.innerHTML;

    const el = document.querySelector('#' + elementToEdit.id);
    el.classList = 'todoElement';

    console.table(todoDatabase);
}

export default addEditEvents;