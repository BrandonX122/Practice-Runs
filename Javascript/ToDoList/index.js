const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');

let allTodos = loadTodos(); //always display the current state of the array for best features.
updateTodoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);  
        updateTodoList();
        saveTodos();
        todoInput.value = ""; 
    }  
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    })
}

function editTodo(field, index) {
    field.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            allTodos[index].text = field.value;
            saveTodos();
            updateTodoList();
        }
    });
}

function createTodoItem(todo, todoIndex) {
    const todoID = "todo-" + todoIndex;
    const todoLI = document.createElement('li');
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
                <input type="checkbox" id="${todoID}">
                <label for="${todoID}" class="custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=transparent>
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${todoID}" class="todo-text">
                    ${todoText}
                </label>
                <button class="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=var(--secondary-color)>
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                </svg>
                </button>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=var(--secondary-color)>
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
    `;

    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteTodoItem(todoIndex));

    const editButton = todoLI.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
        const textElement = todoLI.querySelector('.todo-text');
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.id = 'todo-input'
        newInput.value = todoText;
        textElement.innerHTML = '';
        textElement.append(newInput);

        editTodo(newInput, todoIndex);
    });

    const checkbox = todoLI.querySelector('input');
    checkbox.addEventListener('change', (e) => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;

    return todoLI;
}


function saveTodos() {
    todosJSON = JSON.stringify(allTodos); //makes array into string, allowing it to be passed into localstorage since it requires a JSON
    localStorage.setItem("todos", todosJSON); //Key and Value
}

function loadTodos() {
    const todos = localStorage.getItem("todos") || "[]"
    return JSON.parse(todos);
}

//EDIT FUNCTION
//SEARCH
//PIority
//group task
//