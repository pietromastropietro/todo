import { parseISO, format, parse } from 'date-fns';
import { overlay, form, editClass } from './otherModules';
import { todoDatabase, mainViewCenter, projectDatabase } from './global';
import { load } from './otherModules';


const projectModule = () => {
    const create = () => {
        projectForm.show();
    };
    const submit = () => {
        const newProjectt = projectForm.getData();

        projectDatabase.push(newProjectt);

        newProjectLi(newProjectt);

        projectForm.hide();

        console.table(projectDatabase);

        // add the new project to the project list in the 'new todo form'
        _addProjectToList(newProjectt);
    };
    const deletee = (e) => {
        alert('are u sure');
        // gets the name of the project to delete
        const projectNameDel= e.srcElement.parentElement.className;

        // get the index of the project to delete
        const index = projectDatabase.indexOf(projectNameDel);

        // removes it from the database..
        projectDatabase.splice(index, 1);
        console.table(projectDatabase);

        // .. and refresh page to remove all references to project
        // obv this doesnt work now cause the projects are hardcoded, 
        // when i will include localstorage this should work
        //location.reload();

        // if i dont wanna refresh page, i have to:
        // delete the element from the DOM, from the form selector, and maybe somewhere else

    };
    const _addProjectToList = (projectName) => {
        const projectSelect = document.querySelector('#project');
        const option = document.createElement('option');
        option.value = projectName;
        option.innerHTML = projectName;
        projectSelect.appendChild(option);
    }
    return { create, deletee, submit };
};
const projects = projectModule();

const projectFormModule = () => {
    const getData = () => {
        const eleme = document.querySelector('.projectInput');
        const projectName = eleme.value;
        return projectName;
    }
    const show = () => {
        document.querySelector('.projectForm').style.display = 'unset';
    };
    const hide = () => {
        document.querySelector('.projectForm').style.display = 'none';
    }
    return { show, hide, getData };
};
const projectForm = projectFormModule();

function newProjectLi(item) {
    const projectsBar = document.querySelector('.projectsBar');
    const newprojectbtn = document.querySelector('.newProjectBtn');

    const listItem = document.createElement('li');
    listItem.innerHTML = item;
    listItem.classList = item;

    const deltBtn = document.createElement('button');
    deltBtn.innerHTML = 'X';
    deltBtn.classList = 'deleteProject';

    listItem.appendChild(deltBtn);

    projectsBar.insertBefore(listItem, newprojectbtn);

    listItem.addEventListener('click', load.projectPage);
    deltBtn.addEventListener('click', projects.deletee);
}

export { projects, newProjectLi };