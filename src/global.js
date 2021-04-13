import { todo } from './todoModule';

const todoDatabase = [
    {
        title: 'Write your idea',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuididunt ut labore et dolore magna aliqua.',
        date: '11/04/2021',
        priority: 'high',
        todoId: 'n0',
    },
    {
        title: 'todo elem 2',
        description: 'Lorem ipsum dolor sit amet elit, sed do eiuididunt ut labore et dolore magna aliqua.',
        date: '13/04/2021',
        priority: 'low',
        todoId: 'n1',
    },
];

const inputForm = document.querySelector('.addBox');

const overlayDiv = document.querySelector('.overlay');
overlayDiv.addEventListener('click', todo.save);

const todoObjFactory = (title, description, date, priority, todoId) => {
    todoId = `n${todoId}`;
    return { title, description, date, priority, todoId };
};

const mainViewCenter = document.querySelector('.mainViewCenter');
const todayPageDiv = document.querySelector('.todayPage');
const weekPageDiv = document.querySelector('.weekPage');


export { todoDatabase, inputForm, todoObjFactory, overlayDiv, todayPageDiv, mainViewCenter, weekPageDiv };