import { todo } from './todoModule';

const todoDatabase = [
    {
        title: 'Write your idea',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuididunt ut labore et dolore magna aliqua.',
        date: '12/04/2020',
        priority: 'high',
        todoId: 'n0',
    },
    {
        title: 'todo elem 2',
        description: 'Lorem ipsum dolor sit amet elit, sed do eiuididunt ut labore et dolore magna aliqua.',
        date: '14/06/2020',
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

const todayPage = document.querySelector('.todayPage');

const mainViewCenter = document.querySelector('.mainViewCenter');

export { todoDatabase, inputForm, todoObjFactory, overlayDiv, todayPage, mainViewCenter };