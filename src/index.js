import { createNewTodo, firstLoad } from './todoCreation';

firstLoad();

const newTodoBtn = document.querySelector('.newBtn');
newTodoBtn.addEventListener('click', createNewTodo);

// function editEvents() {
//     const editTitle = document.querySelectorAll('.todoTitle');
//     editTitle.forEach((title) => {
//         title.addEventListener('click', editTodo);
//     });

//     const editDescription = document.querySelectorAll('.todoDescription');
//     editDescription.forEach((description) => {
//         description.addEventListener('click', editTodo);
//     });
// }

// function editTodo(e) {
//     console.log(e.target.parentElement.id);
// }