import { todoDatabase } from './global';

function deleteTodo(e) {
    const idDel = e.srcElement.parentElement.id;

    const index2 = todoDatabase.map(function (e) {
        return e.todoId;
    }).indexOf(idDel);

    const elToDel = document.querySelector('#' + idDel);
    elToDel.remove();

    todoDatabase.splice(index2, 1);
}

export default deleteTodo;