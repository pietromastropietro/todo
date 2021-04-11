import { todayPage, todoDatabase } from "./global";
import { todo, newTodoDiv } from './todoModule';

function todayPageLoad() {
    // hide the previous page content
    const mainView = document.querySelector('.mainView');
    mainView.style.display = 'none';

    todayPage.style.display = 'unset';

    // create the todos from the database
    todoDatabase.forEach(item => {
        newTodoDiv(todayPage, item);
    });
};

export default todayPageLoad;