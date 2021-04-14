import { parseISO, format, parse } from 'date-fns';
import { overlay, form, editClass } from './otherModules';
import { todoDatabase, mainViewCenter, projectDatabase } from './global';

const todoModule = () => {
    let todoIdEdit;

    const create = (e) => {
        // Shows the form to create a new todo
        form.show();

        // TODO i have to add the overlay and editClass as i do on the editing
    };

    // Function called when the user presses the Add form button
    const submit = () => {
        // create a new object with the form data submitted and returned by getData
        const newTodo = form.getData();

        // Pushes it into the database
        todoDatabase.push(newTodo);

        // Creates the div element to show the new todo
        newTodoDiv(mainViewCenter, newTodo);

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
        console.log(todoIdEdit);

        overlay.show();
        editClass.on(todoIdEdit);
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

        const newProject = _saveProjectChoise();

        // get the index of the todo to edit
        const index = _getIndex(todoIdEdit);

        // updates the todo data in the database
        todoDatabase[index].title = newTitle.innerHTML;
        todoDatabase[index].description = newDescription.innerHTML;
        todoDatabase[index].date = newDate;
        todoDatabase[index].project = newProject;
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
    const dateInputOn = (e) => {
        todo.edit(e);

        const oldElement = document.querySelector(`#${todoIdEdit} > .todoDate`);
        const oldElementValue = format(parse(oldElement.innerHTML, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');

        const newElement = document.createElement('input');
        newElement.type = 'date';
        newElement.classList = 'todoDate';
        newElement.value = oldElementValue;
        oldElement.replaceWith(newElement);

    };

    const _dateInputOff = () => {
        const oldElement = document.querySelector(`#${todoIdEdit} > .todoDate`);

        // if the element is a 'input' it means that the date has changed
        if (oldElement.tagName == 'INPUT') {
            const oldElementValue = format(parseISO(oldElement.value), 'dd/MM/yyyy');

            const newElement = document.createElement('div');
            newElement.classList = 'todoDate';
            newElement.innerHTML = oldElementValue;
            oldElement.replaceWith(newElement);

            editEvents();

            return oldElementValue;
        } else {
            // else do nothing and just return the old date value
            return oldElement.innerHTML;
        }
    };

    const priorityInputOn = (e) => {
        todo.edit(e);

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

        if (oldElement.innerHTML == 'high') {
            option1.selected = true;
        } else if (oldElement.innerHTML == 'medium') {
            option2.selected = true;
        } else {
            option3.selected = true;
        };

        newElement.appendChild(option1);
        newElement.appendChild(option2);
        newElement.appendChild(option3);

        oldElement.replaceWith(newElement);
    };

    const _priorityInputOff = () => {
        const oldElement = document.querySelector(`#${todoIdEdit} > .todoPriority`);

        if (oldElement.tagName == 'SELECT') {

            const newElement = document.createElement('div');
            newElement.classList = 'todoPriority';
            newElement.innerHTML = oldElement.value;
            oldElement.replaceWith(newElement);

            editEvents();

            return newElement.innerHTML;
        } else {
            return oldElement.innerHTML;
        }
    };
    const chooseProject = (e) => {
        todo.edit(e);

        const oldElement = document.querySelector(`#${todoIdEdit} > .todoProject`);

        const newElement = document.createElement('select');
        newElement.id = 'project';
        newElement.classList = 'todoProject';
        newElement.name = 'project';

        // TODO copy this for the priority function if possible
        for (let item of projectDatabase) {
            const option = document.createElement('option');
            option.value = item;
            option.innerHTML = item;

            if (item == oldElement.innerHTML) {
                option.selected = true;
            };

            newElement.appendChild(option);
        };
        oldElement.replaceWith(newElement);
    };
    const _saveProjectChoise = () => {
        const oldElement = document.querySelector(`#${todoIdEdit} > .todoProject`);

        if (oldElement.tagName == 'SELECT') {
            const newElement = document.createElement('div');
            newElement.classList = 'todoProject';
            newElement.innerHTML = oldElement.value;
            oldElement.replaceWith(newElement);

            editEvents();
            return newElement.innerHTML;
        } else {
            return oldElement.innerHTML;
        }
    };

    return { create, submit, edit, save, deletee, dateInputOn, priorityInputOn, chooseProject };
};
const todo = todoModule();

function newTodoDiv(parent, newTodoObj) {

    const todoElement = document.createElement('div');
    todoElement.classList = 'todoElement';
    todoElement.setAttribute('id', `${newTodoObj.todoId}`)

    const todoTitle = document.createElement('div');
    todoTitle.classList = 'todoTitle';
    todoTitle.contentEditable = true;
    todoTitle.spellcheck = false;
    todoTitle.textContent = newTodoObj.title;

    // const todoCheck = document.createElement('div');
    // todoCheck.classList = 'todoCheck';

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

    const todoProject = document.createElement('div');
    todoProject.classList = 'todoProject';
    todoProject.textContent = newTodoObj.project;

    todoElement.appendChild(todoTitle);
    // todoElement.appendChild(todoCheck);
    todoElement.appendChild(todoDescription);
    todoElement.appendChild(todoDate);
    todoElement.appendChild(todoDeleteBtn);
    todoElement.appendChild(todoProject);
    todoElement.appendChild(todoPriority);

    parent.prepend(todoElement);

    //temp
    console.table(todoDatabase);

    editEvents();
}

function editEvents() {

    document.querySelectorAll('.todoTitle, .todoDescription').forEach(item => {
        item.addEventListener('click', todo.edit);
    });

    document.querySelectorAll('.todoDate').forEach(item => {
        item.addEventListener('click', todo.dateInputOn);
    });

    document.querySelectorAll('.todoProject').forEach(item => {
        item.addEventListener('click', todo.chooseProject);
    });

    document.querySelectorAll('.todoPriority').forEach(item => {
        item.addEventListener('click', todo.priorityInputOn);
    });

    document.querySelectorAll('.todoDeleteBtn').forEach(itemm => {
        itemm.addEventListener('click', todo.deletee);
    });
}

export { todo, newTodoDiv };