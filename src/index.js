//import { todoDatabase, mainViewCenter, todayPageDiv, weekPageDiv } from './global';
import { todo } from './todoModule';
import { load } from './otherModules';
// import { parseISO, format, startOfWeek, addDays   } from 'date-fns';

/*
TODO
add an overlay for the new todo form, so i can remove the add button.
when the user clicks on the overlay the new todo is automatically created (if not empty)
like what happens with the edit form

TODO
when i click the add button, the todo should be created in the appropriate section.
for ex, if im in the 'today' page and i create a todo with todays date, that todo should appear 
there, instead i have to reload the today page to make it appear. i could probably add a 
automatic reload of the page(?)

TODO
when i edit a todo date, i have to move that todo in the appropriate section.
for ex if im in the today/week page and set a todo's date different from today/week
date, i should move the todo to the appropriate section.
*/

function firstLoad() {
    document.querySelector('.newBtn').addEventListener('click', todo.create);
    document.querySelector('.submit').addEventListener('click', todo.submit);

    document.querySelector('.todayBtn').addEventListener('click', load.todayPage);
    document.querySelector('.homeBtn').addEventListener('click', load.homePage);
    document.querySelector('.weekBtn').addEventListener('click', load.weekPage);
    // ... other eventlisteners will follow (searchbar, today/this week sections etc)

    // set today's date as default for any new todo
    document.querySelector('#date').valueAsDate = new Date();

    load.homePage();
};

firstLoad();