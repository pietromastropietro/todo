import { parseISO, format, parse } from 'date-fns';
import { overlay, form, editClass } from './otherModules';
import { todoDatabase } from './global';

const todoModule = () => {
    let todoIdEdit;

    const create = (e) => {
        // Shows the form to create a new todo
        form.show();
    };

    // Function called when the user presses the Add form button
    const submit = () => {
        // create a new object with the form data submitted and returned by getData
        const newTodo = form.getData();

        // Pushes it into the database
        todoDatabase.push(newTodo);

        // Creates the div element to show the new todo
        newTodoDiv(newTodo);

        // Hides the form 
        form.hide();

        // hides the overlay
        overlay.hide();
    };

    // clickin on any part of the todo (title, descr etc.) calls this
    const edit = (e) => {
        /* 
        TODO 
        i should disable and then reactivate the event listeners of title, descr etc cause
        when the user edits them, any click on them gets caught and this function 
        gets called every time 
        */

        // gets the id of the todo to edit
        todoIdEdit = e.srcElement.parentElement.id;

        overlay.show();
        editClass.on(todoIdEdit);

        // activates the date selector
        _dateInputOn();
        _priorityInputOn();
    };

    // clicking on the overlay calls this function
    const save = () => {
        overlay.hide();

        // selects all the elements to edit
        const newTitle = document.querySelector(`#${todoIdEdit} > .todoTitle`);
        const newDescription = document.querySelector(`#${todoIdEdit} > .todoDescription`);

        // deactivates the date selector and returns the new inputted date
        const newDate = _dateInputOff();

        const newPriority = _priorityInputOff();

        // get the index of the todo to edit
        const index = _getIndex(todoIdEdit);

        // updates the todo data in the database
        todoDatabase[index].title = newTitle.innerHTML;
        todoDatabase[index].description = newDescription.innerHTML;
        todoDatabase[index].date = newDate;
        todoDatabase[index].priority = newPriority;

        // temp
        console.table(todoDatabase);

        editClass.off(todoIdEdit);
    };

    const deletee = (e) => {
        // gets the id of the todo to delete
        const todoIdDel = e.srcElement.parentElement.id;

        // get the index of the todo to delete
        const index = _getIndex(todoIdDel);

        // deletes the element from the DOM..
        document.querySelector(`#${todoIdDel}`).remove();

        // ..and from the database
        todoDatabase.splice(index, 1);
        console.table(todoDatabase);

    };

    const _getIndex = (item) => {

        // searches the database and returns the index of the item (the todo)
        const index = todoDatabase.map(function (e) {
            return e.todoId;
        }).indexOf(item);

        return index;
    };

    // TODO
    // fix date formats to simplify these two functions below and the code in "form.getData"
    const _dateInputOn = () => {
        const oldElement = document.querySelector(`#${todoIdEdit} > .todoDate`);
        const oldElementValue = format(parse(oldElement.innerHTML, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');

        const newElement = document.createElement('input');
        newElement.type = 'date';
        newElement.classList = 'todoDate';
        newElement.value = oldElementValue;
        oldElement.replaceWith(newElement);
    }

    const _dateInputOff = () => {
        const oldElement = document.querySelector(`#${todoIdEdit} > .todoDate`);
        const oldElementValue = format(parseISO(oldElement.value), 'dd/MM/yyyy');

        const newElement = document.createElement('div');
        newElement.classList = 'todoDate';
        newElement.innerHTML = oldElementValue;
        oldElement.replaceWith(newElement);

        return oldElementValue;
    };

    // TODO
    // fix the fact that the priority value resets to the first on the list (high) when
    // editing a todo. this is a problem bcs it changes the previous priority and the user
    // may forget to modify to the previous state. one way to fix it is to toggle the
    //ability to modify the priority only when clicking on the actual priority element.
    const _priorityInputOn = () => {
        const oldElement = document.querySelector(`#${todoIdEdit} > .todoPriority`);

        const newElement = document.createElement('select');
        newElement.id = 'priority';
        newElement.classList = 'todoPriority';
        newElement.name = 'priority';

        const option1 = document.createElement('option');
        option1.value = 'high';
        option1.innerHTML = 'High';

        const option2 = document.createElement('option');
        option2.value = 'medium';
        option2.innerHTML = 'Medium';

        const option3 = document.createElement('option');
        option3.value = 'low';
        option3.innerHTML = 'Low';

        newElement.appendChild(option1);
        newElement.appendChild(option2);
        newElement.appendChild(option3);

        oldElement.replaceWith(newElement);
    };

    const _priorityInputOff = () => {
        const oldElement = document.querySelector(`#${todoIdEdit} > .todoPriority`);

        const newElement = document.createElement('div');
        newElement.classList = 'todoPriority';
        newElement.innerHTML = oldElement.value;
        oldElement.replaceWith(newElement);

        console.log(newElement.innerHTML);

        return newElement.innerHTML;
    };

    return { create, submit, edit, save, deletee };
};
const todo = todoModule();

function newTodoDiv(newTodoObj) {
    // TEMP
    const mainView = document.querySelector('.mainView');

    const todoElement = document.createElement('div');
    todoElement.classList = 'todoElement';
    todoElement.setAttribute('id', `${newTodoObj.todoId}`)


    const todoTitle = document.createElement('div');
    todoTitle.classList = 'todoTitle';
    todoTitle.contentEditable = true;
    todoTitle.spellcheck = false;
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

    const todoDeleteBtn = document.createElement('div');
    todoDeleteBtn.classList = 'todoDeleteBtn';
    todoDeleteBtn.textContent = 'Delete';

    const todoPriority = document.createElement('div');
    todoPriority.classList = 'todoPriority';
    todoPriority.textContent = newTodoObj.priority;

    todoElement.appendChild(todoTitle);
    todoElement.appendChild(todoCheck);
    todoElement.appendChild(todoDescription);
    todoElement.appendChild(todoDate);
    todoElement.appendChild(todoDeleteBtn);
    todoElement.appendChild(todoPriority);

    mainView.appendChild(todoElement);
    editEvents();
}

function editEvents() {
    document.querySelectorAll('.todoTitle, .todoDescription, .todoDate').forEach(item => {
        item.addEventListener('click', todo.edit);
    });

    document.querySelectorAll('.todoDeleteBtn').forEach(itemm => {
        itemm.addEventListener('click', todo.deletee);
    });
}

export { todo, newTodoDiv };