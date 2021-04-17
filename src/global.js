import { todo } from './todoModule';

const todoDatabase = [
    {
        title: 'Write your idea',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuididunt ut labore et dolore magna aliqua.',
        date: '11/04/2021',
        priority: 'high',
        project: 'Work',
        todoId: 'n0',
    },
    {
        title: 'todo elem 2',
        description: 'Lorem ipsum dolor sit amet elit, sed do eiuididunt ut labore et dolore magna aliqua.',
        date: '13/04/2021',
        priority: 'low',
        project: 'Gym',
        todoId: 'n1',
    },
];

const projectDatabase = ['Work', 'Gym'];

const inputForm = document.querySelector('#todoForm');

const overlayDiv = document.querySelector('#overlay');
overlayDiv.addEventListener('click', todo.save);

const todoObjFactory = (title, description, date, priority, project, todoId) => {
    todoId = `n${todoId}`;
    return { title, description, date, priority, project, todoId };
};

const mainViewCenter = document.querySelector('#homePage');
const todayPageDiv = document.querySelector('.todayPage');
const weekPageDiv = document.querySelector('.weekPage');
const projectPageDiv = document.querySelector('.projectPage');

export { todoDatabase, inputForm, todoObjFactory, overlayDiv, todayPageDiv, mainViewCenter, weekPageDiv, projectDatabase, projectPageDiv };