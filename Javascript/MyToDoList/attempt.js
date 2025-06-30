const inputField = document.querySelector('#main-input-field');
const todoList = document.querySelector('ul');
const todoForm = document.querySelector('form');
let allTodos = loadTodos();
updateTodoList()

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoString = inputField.value.trim();
    if(todoString.length > 0) {
        todoObject = {
            text: todoString,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
    }
    inputField.value = '';
}

function editTodoItem(inputField, index) {
    inputField.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            allTodos[index].text = inputField.value;
            saveTodos();
            updateTodoList();
        }
    })
}

function deleteTodoItem(index) {
    allTodos = allTodos.filter((_, i) => i !== index);
    updateTodoList();
    saveTodos();
}

function updateTodoList() {
    todoList.innerHTML = '';
    allTodos.forEach((todo, index) => {
        todo = createTodoItem(todo, index);
        todoList.append(todo);
    })
}

function createTodoItem(todo, index) {
    const todoLi = document.createElement('li');
    const todoID = "todo-" + index;
    const todoText = todo.text;
    todoLi.innerHTML = `
        <div class='top-of-todo'>
            <input type='checkbox' id=${todoID} class='custom-checkbox'>
            <div class='todo-buttons'>
                <button id='editButton'>Edit</button>
                <button id='deleteButton'>Delete</button> 
            </div> 
        </div>
        <label for=${todoID} class='todo-text'>
            ${todoText}
        </label>
    `

    const editButton = todoLi.querySelector('#editButton');
    editButton.addEventListener('click', () => {
        const oldTextElement = todoLi.querySelector('.todo-text')
        const newInputField = document.createElement('input');
        newInputField.value = todoText;
        newInputField.classList.add('input-field');
        oldTextElement.innerHTML = '';
        oldTextElement.append(newInputField);
        editTodoItem(newInputField, index)
    })
    const deleteButton = todoLi.querySelector('#deleteButton');
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(index);
    })

    const checkbox = todoLi.querySelector('input');
    checkbox.addEventListener('change', () => {
        allTodos[index].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;

    return todoLi;
}
function saveTodos() {
    todoJSON = JSON.stringify(allTodos);
    localStorage.setItem('todos', todoJSON);
}

function loadTodos() {
    todos = localStorage.getItem('todos') || '[]'
    return JSON.parse(todos);
}