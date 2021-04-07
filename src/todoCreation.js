import { todoDatabase } from './global';
import addEditEvents from './todoEdit';


//const todoDatabase = [];
// console.table(todoDatabase);

const todoObjFactory = (title, description, date, priority, todoId) => {
    return { title, description, date, priority, todoId };
}
const mainView = document.querySelector('.mainView');

const form = document.querySelector('.addBox');
const formSubmitBtn = document.querySelector('.submit');

let title, description, date, priority, todoId = 0, todoId2 = 'n';

// const body = document.querySelector('.todoElement');
// body.addEventListener('click', f => {
//     form.style.display = "none";
// });
addEditEvents();

function firstLoad () {
    // const todoObj = todoObjFactory(
    //     'Write your idea', 
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuididunt ut labore et dolore magna aliqua.', 
    //     '12/04/2020',
    //     'high',
    //     '0'
    // );

    // todoDatabase.push(todoObj);

    const newTodoObj = createNewTodoDiv(todoDatabase[0]);
    todoId++;
    const newTodoObj2 = createNewTodoDiv(todoDatabase[1]);

    mainView.appendChild(newTodoObj);
    mainView.appendChild(newTodoObj2);
    addEditEvents();

}

function createNewTodo() {
    showForm();
    formSubmitBtn.addEventListener('click', addNewTodo);
}

function showForm() {
    if (form.style.display === "none") {
        form.style.display = "grid";
    } else {
        form.style.display = "grid";
    }
}

function addNewTodo() {
    const newTodoObj = getFormData();

    todoDatabase.push(newTodoObj);
    // console.table(todoDatabase);
    const newTodoDiv = createNewTodoDiv(newTodoObj);
    mainView.appendChild(newTodoDiv);
    addEditEvents();
}

// takes the form data values and returns a 'todo' object
function getFormData() {
    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
    date = document.getElementById('date').value;
    priority = document.getElementById('priority').value;

    todoId++;

    todoId2 += todoId;

    const todoObj = todoObjFactory(title, description, date, priority, todoId2);
    todoId2 = 'n';
    return todoObj;
}

function createNewTodoDiv(newTodoObj) {
    form.style.display = "none";

    const todoElement = document.createElement('div');
    todoElement.classList = 'todoElement';
    todoElement.setAttribute('id', `n${todoId}`)

    const todoTitle = document.createElement('div');
    todoTitle.classList = 'todoTitle';
    todoTitle.contentEditable = 'true';
    todoTitle.spellcheck = 'false';
    todoTitle.textContent = newTodoObj.title;

    const todoCheck = document.createElement('div');
    todoCheck.classList = 'todoCheck';

    const todoDescription = document.createElement('div');
    todoDescription.classList = 'todoDescription';
    todoDescription.contentEditable = true;
    todoDescription.spellcheck = false;
    todoDescription.textContent = newTodoObj.description;

    const todoDate = document.createElement('div');
    todoDate.classList = 'todoDate';
    todoDate.textContent = newTodoObj.date;

    const todoPriority = document.createElement('div');
    todoPriority.classList = 'todoPriority';
    todoPriority.textContent = newTodoObj.priority;

    todoElement.appendChild(todoTitle);
    todoElement.appendChild(todoCheck);
    todoElement.appendChild(todoDescription);
    todoElement.appendChild(todoDate);
    todoElement.appendChild(todoPriority);

    return todoElement;
}

// function editEvents() {
//     const editTitle = document.querySelectorAll('.todoTitle');
//     editTitle.forEach((title) => {
//         title.addEventListener('click', editTodo);
//     });

//     const editDescription = document.querySelectorAll('.todoDescription');
//     editDescription.forEach((description) => {
//         description.addEventListener('click', editTodo);
//     });
// }

// function editTodo(e) {
//     console.log(e.target.parentElement.id);
// }

export { createNewTodo, firstLoad }