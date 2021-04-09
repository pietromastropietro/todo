import { createNewTodo, firstLoad } from './todoCreation';

firstLoad();

const newTodoBtn = document.querySelector('.newBtn');
newTodoBtn.addEventListener('click', createNewTodo);

// function addEvents() {
//     const editTitle = document.querySelectorAll('.todoTitle');
//     editTitle.forEach((title) => {
//         title.addEventListener('click', editTodo);
//     });

//     const editDescription = document.querySelectorAll('.todoDescription');
//     editDescription.forEach((description) => {
//         description.addEventListener('click', editTodo);
//     });

//     const deleteBtn = document.querySelectorAll('.todoDeleteBtn');
//     deleteBtn.forEach((btn) => {
//         btn.addEventListener('click', deleteTodo);
//     });

//     const editDate = document.querySelectorAll('.todoDate');
//     editDate.forEach((date) => {
//         date.addEventListener('click', editTodo);
//     });

// }