import { parseISO, format } from 'date-fns';
import { nn } from 'date-fns/locale'; // what is this? i didnt add it
import { inputForm, todoObjFactory, overlayDiv } from './global';

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

export { overlay, form, editClass };