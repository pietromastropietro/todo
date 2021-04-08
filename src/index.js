import { createNewTodo, firstLoad } from './todoCreation';

firstLoad();

const newTodoBtn = document.querySelector('.newBtn');
newTodoBtn.addEventListener('click', createNewTodo);