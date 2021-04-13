import { parseISO, format } from 'date-fns';
import { nn } from 'date-fns/locale'; // what is this? i didnt add it
import { inputForm, todoObjFactory, overlayDiv, mainViewCenter, todayPageDiv, todoDatabase } from './global';
import { todo, newTodoDiv } from './todoModule';

const loadModule = () => {
    const homePage = () => {
        // deletes the previous page content and shows the current page
        _clear(todayPageDiv, mainViewCenter)

        // create the todos from the database
        todoDatabase.forEach(item => {
            newTodoDiv(mainViewCenter, item);
        });
    };
    const todayPage = () => {
        // deletes the previous page content and shows the current page
        _clear(mainViewCenter, todayPageDiv);

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
        //_clear(mainViewCenter, todayPageDiv);

        // gets the current week
        const currentWeek = getCurrentWeek();

        // creates only the todos with the current week
        for (let item of todoDatabase) {
            for (let day of currentWeek) {
                //console.log(`${item.date} === ${day}`);
                if (item.date === day) {
                    // add the todo creation
                    break;
                };
            };
        };
    };
    const _clear = (oldElement, newElement) => {
        oldElement.innerHTML = '';
        oldElement.style.display = 'none'

        newElement.innerHTML = '';
        newElement.style.display = 'unset';
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

// TODO test different dates and days, for ex:
// what happens for a week that includes a change in month? "when month get changed it seems fail." is it true?
// "If today is sunday you'll get next week, because sunday have index 0" is it true?
// "if the date is 1 then this wont work" is it true?
function getCurrentWeek() {
    const current = new Date();

    // current first day of the week (sunday) as a number
    const firstWeekDay = current.getDate() - current.getDay();

    const week = [];

    for (let i = 1; i <= 7; i++) {
        // pushes all the dates of the current week in the array. 
        // "firstWeekDay + i" cause i need the week to start on monday, not sunday.
        week[i - 1] = format(new Date(current.setDate(firstWeekDay + i)), 'dd/MM/yyyy');
    };

    return week;
}

export { load, overlay, form, editClass };