import { todoDatabase } from './global';
import { todo, newTodoDiv } from './todoModule';

// TODO
// add an overlay for the new todo form, so i can remove the add button.
// when the user clicks on the overlay the new todo is automatically created (if not empty)
// like what happens with the edit form

(function firstLoad() {
    document.querySelector('.newBtn').addEventListener('click', todo.create);
    document.querySelector('.submit').addEventListener('click', todo.submit);
    // ... other eventlisteners will follow (searchbar, today/this week sections etc)

    // set today's date as default for any new todo
    document.querySelector('#date').valueAsDate = new Date();

    newTodoDiv(todoDatabase[0]);
    newTodoDiv(todoDatabase[1]);
})();