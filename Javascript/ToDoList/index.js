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
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=var(--secondary-color)>
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
    `;

    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteTodoItem(todoIndex));
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