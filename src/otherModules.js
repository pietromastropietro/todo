import { parseISO, format, startOfWeek, addDays } from 'date-fns';
import { nn } from 'date-fns/locale'; // what is this? i didnt add it
import { inputForm, todoObjFactory, overlayDiv, mainViewCenter, todayPageDiv, todoDatabase, weekPageDiv } from './global';
import { todo, newTodoDiv } from './todoModule';

const loadModule = () => {
    const homePage = () => {
        // deletes the previous page content and shows the current page
        _clear([todayPageDiv, weekPageDiv]);
        _display(mainViewCenter);


        // create the todos from the database
        todoDatabase.forEach(item => {
            newTodoDiv(mainViewCenter, item);
        });
    };
    const todayPage = () => {
        // deletes the previous page content and shows the current page
        _clear([mainViewCenter, weekPageDiv]);
        _display(todayPageDiv);

        // gets the current date
        const currentDayDate = format(new Date(), 'dd/MM/yyyy');

        // creates only the todos with the current date
        todoDatabase.forEach(item => {
            if (item.date === currentDayDate) {
                newTodoDiv(todayPageDiv, item);
            };
        });
    };
    const weekPage = () => {
        // deletes the previous page content and shows the current page
        _clear([mainViewCenter, todayPageDiv]);
        _display(weekPageDiv);

        // gets the current week
        const currentWeek = getCurrentWeek();

        // creates only the todos with the current week
        for (let item of todoDatabase) {
            for (let day of currentWeek) {
                if (item.date === day) {
                    newTodoDiv(weekPageDiv, item);
                    break;
                };
            };
        };
    };
    const _clear = (arr) => {
        for (let items of arr) {
            items.innerHTML = '';
            items.style.display = 'none'
        };
    };
    const _display = (element) => {
        element.innerHTML = '';
        element.style.display = 'unset';
    };
    return { todayPage, homePage, weekPage };
};
const load = loadModule();

const overlayModule = () => {
    const show = () => {
        overlayDiv.style.display = 'flex';
    };
    const hide = () => {
        overlayDiv.style.display = 'none';
    };
    return { show, hide };
};
const overlay = overlayModule();

const formModule = () => {
    // this is 2 to take into count the default todos (i should change it later)
    let todoId = 2;

    // Gets the 'new todo' form data and returns them into an object 
    const getData = () => {
        const todoObj = todoObjFactory(
            document.getElementById('title').value,
            document.getElementById('description').value,
            format(parseISO(document.getElementById('date').value), 'dd/MM/yyyy'),
            document.getElementById('priority').value,
            todoId++,
        );
        return todoObj;
    };
    const show = () => {
        inputForm.style.display = "grid";
    };
    const hide = () => {
        inputForm.style.display = "none";
    };
    return { getData, show, hide };
};
const form = formModule();

const toggleEditClass = () => {
    const on = (itemId) => {
        document.querySelector(`#${itemId}`).classList = 'todoElement edit';
    };
    const off = (itemId) => {
        document.querySelector(`#${itemId}`).classList = 'todoElement';
    };
    return { on, off };
};
const editClass = toggleEditClass();

function getCurrentWeek() {
    const current = new Date();
    const week = [];

    // get the first day of the week (as a monday)
    const first = startOfWeek(current, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
        // pushes all the dates of the current week in the array.
        week[i] = format(new Date(addDays(first, i)), 'dd/MM/yyyy');
    };

    return week;
}

export { load, overlay, form, editClass };