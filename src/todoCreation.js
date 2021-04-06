const todoDatabase = [];

const todoObjFactory = (title, description, date, priority, todoId) => {
    return { title, description, date, priority, todoId };
}
const mainView = document.querySelector('.mainView');

const form = document.querySelector('.addBox');
const formSubmitBtn = document.querySelector('.submit');

let title, description, date, priority, todoId = 0;

// const body = document.querySelector('.todoElement');
// body.addEventListener('click', f => {
//     form.style.display = "none";
// });

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
     console.table(todoDatabase);
    const newTodoDiv = createNewTodoDiv(newTodoObj);
    mainView.appendChild(newTodoDiv);
}

// takes the form data values and returns a 'todo' object
function getFormData() {
    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
    date = document.getElementById('date').value;
    priority = document.getElementById('priority').value;

    todoId++;

    const todoObj = todoObjFactory(title, description, date, priority, todoId);
    return todoObj;
}

function createNewTodoDiv(newTodoObj) {
    form.style.display = "none";

    const todoElement = document.createElement('div');
    todoElement.classList = 'todoElement';
    todoElement.setAttribute('id', `#${todoId}`)

    const todoTitle = document.createElement('div');
    todoTitle.classList = 'todoTitle';
    todoTitle.textContent = newTodoObj.title;

    const todoCheck = document.createElement('div');
    todoCheck.classList = 'todoCheck';

    const todoDescription = document.createElement('div');
    todoDescription.classList = 'todoDescription';
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

export default createNewTodo;