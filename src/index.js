import { todoDatabase, mainViewCenter, todayPage } from './global';
import { todo, newTodoDiv } from './todoModule';
import todayPageLoad from './todayPage';

// TODO
// add an overlay for the new todo form, so i can remove the add button.
// when the user clicks on the overlay the new todo is automatically created (if not empty)
// like what happens with the edit form

function firstLoad() {
    document.querySelector('.newBtn').addEventListener('click', todo.create);
    document.querySelector('.submit').addEventListener('click', todo.submit);
    document.querySelector('.todayBtn').addEventListener('click', load.today);
    document.querySelector('.homeBtn').addEventListener('click', load.home);
    // ... other eventlisteners will follow (searchbar, today/this week sections etc)

    // set today's date as default for any new todo
    document.querySelector('#date').valueAsDate = new Date();

    todoDatabase.forEach(item => {
        newTodoDiv(mainViewCenter, item);
    });
};

const loadModule = () => {
    const home = () => {
        todayPage.style.display = 'none';

        const mainView = document.querySelector('.mainView');
        mainView.style.display = 'unset';
    };
    const today = () => {
        // hide the previous page content
        const mainView = document.querySelector('.mainView');
        mainView.style.display = 'none';
       
        todayPage.innerHTML = '';
        todayPage.style.display = 'unset';

        // create the todos from the database
        todoDatabase.forEach(item => {
            newTodoDiv(todayPage, item);
        });
    };
    return { today, home };
};
const load = loadModule();

firstLoad();