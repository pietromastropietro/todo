const formSubmitBtn = document.querySelector('.submit');
formSubmitBtn.addEventListener('click', submit);

function todoCreation() {
    // Shows the form to create a new todo
    formm.show();
}

// Function called when the user presses the Submit form button
function submit() {

    // Creates a new object with the form data submitted and returned as obj by getformData;
    const newTodoObj = formm.getData();

    // Pushes it into the database
    todoDatabase.push(newTodoObj);

    // Creates the div element to show the new todo
    createNewTodoDiv(newTodoObj);

    // Hides the form 
    formm.hide();
}


const formModule = () => {
    // this is 2 to take into count the default todos (i should change it later)
    let todoId = 2;

    // Gets the 'new todo' form data and returns them into an object 
    const getData = () => {
        const todoObj = todoObjFactory(
            document.getElementById('title').value,
            document.getElementById('description').value,
            format(parseISO(document.getElementById('date').value), 'dd/MM/yyyy'),
            document.getElementById('priority').value,
            todoId++,
        );
        return todoObj;
    }

    const show = () => {
        form.style.display = "grid";
    };

    const hide = () => {
        form.style.display = "none";
    }

    return { getData, show, hide };
};

const formm = formModule();

