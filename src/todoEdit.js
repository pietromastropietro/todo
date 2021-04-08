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

    const deleteBtn = document.querySelectorAll('.todoDeleteBtn');
    deleteBtn.forEach((btn) => {
        btn.addEventListener('click', deleteTodo);
    });

    const editDate = document.querySelectorAll('.todoDate');
    editDate.forEach((date) => {
        date.addEventListener('click', editTodo);
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

    dateEdit();

    showOverlay();

    overlay.addEventListener('click', hideOverlay);
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

    const titlee = document.querySelector('#' + elementToEdit.id + '>' + '.todoTitle');
    const descr = document.querySelector('#' + elementToEdit.id + '>' + '.todoDescription')

    const index = todoDatabase.map(function (e) {
        return e.todoId;
    }).indexOf(elementToEdit.id);

    todoDatabase[index].title = titlee.innerHTML;
    todoDatabase[index].description = descr.innerHTML;

    const el = document.querySelector('#' + elementToEdit.id);
    el.classList = 'todoElement';

}

function deleteTodo(e) {
    const idDel = e.srcElement.parentElement.id;

    const index2 = todoDatabase.map(function (e) {
        return e.todoId;
    }).indexOf(idDel);

    const elToDel = document.querySelector('#' + idDel);
    elToDel.remove();

    todoDatabase.splice(index2, 1);
}

export default addEditEvents;