import { projectDatabase } from './global';
import { todo } from './todoModule';
import { load } from './otherModules';
import { projects, newProjectLi } from './projectModule';
import { saveToLS, getFromLS } from './localstorage';
// import { parseISO, format, startOfWeek, addDays   } from 'date-fns';

/*
TODO
add an overlay for the new todo and new project forms, so i can remove the add button.
when the user clicks on the overlay the new todo/project is automatically created (if not empty)
like what happens with the edit form

TODO
when i click the add button, the todo should be created in the appropriate section.
for ex, if im in the 'today' page and i create a todo with todays date, that todo should appear 
there, instead i have to reload the today page to make it appear. i could probably add a 
automatic reload of the page(?)

TODO
when i edit a todo date, i have to move that todo in the appropriate section.
for ex if im in the today/week page and set a todo's date different from today/week
date, i should move the todo to the appropriate section. same if i set a different project
from the one im currently in.


TODO 
change all the mainviewCenter with 'homepage'
*/

function firstLoad() {
    document.querySelector('#newTodoBtn').addEventListener('click', todo.create);
    document.querySelector('.submit').addEventListener('click', todo.submit);

    document.querySelector('#todayBtn').addEventListener('click', load.todayPage);
    document.querySelector('#homeBtn').addEventListener('click', load.homePage);
    document.querySelector('#weekBtn').addEventListener('click', load.weekPage);


    document.querySelector('#dropBtn').addEventListener('click', showDrop);
    document.querySelector('#newProjectBtn').addEventListener('click', projects.create);
    document.querySelector('.submitProject').addEventListener('click', projects.submit)
    // TOADD
    //document.querySelector('.cancel').addEventListener('click', function);


    //set today's date as default for any new todo
    document.querySelector('#date').valueAsDate = new Date();

    load.homePage();

    // creates the projects from the database
    projectDatabase.forEach(item => {
        newProjectLi(item);
    });

    // updates the 'new todo form' with all the project choises
    const projectSelect = document.querySelector('#project');

    for (let item of projectDatabase) {
        const option = document.createElement('option');
        option.value = item;
        option.innerHTML = item;
        projectSelect.appendChild(option);
    };
};

firstLoad();

function showDrop () {
    document.querySelector('#projectList').classList.toggle('show');
}
