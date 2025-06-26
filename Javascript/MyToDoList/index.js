const todoInput = document.querySelector("#input-field")
const todoList = document.querySelector('ul')
const todoForm = document.querySelector('form')

let allTodos = loadTodos();
updateTodoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

function addTodo() {
    const todoText = todoInput.value.trim();
    if(todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject)
        updateTodoList();
        saveTodos()
        todoInput.value = '';
    }

}

function editTodoItem(todoIndex, newText) {
    newText.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            allTodos[todoIndex].text = newText.value;
            saveTodos();
            updateTodoList();
        }
    });
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function updateTodoList() {
    todoList.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoList.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex) {
    const todoID = "todo-" + todoIndex;
    const todoText = todo.text;
    const todoLi = document.createElement('li');
    todoLi.innerHTML = `
    <label id=${todoID} class='todo-text'>
        ${todoText}
    </label>
    <button id='editButton'>
        Edit
    </button>
    <button id='deleteButton'>
        Delete
    </button>
    `

    const editButton = todoLi.querySelector('#editButton');
    editButton.addEventListener('click', () => {
        const newText = document.createElement('input');
        newText.type = 'text';
        newText.value = todoText;  
        todoLi.querySelector('.todo-text').innerHTML = '';
        todoLi.querySelector('.todo-text').append(newText)
        editTodoItem(todoIndex, newText);
    })

    const deleteButton = todoLi.querySelector('#deleteButton');
    deleteButton.addEventListener('click', (e) => deleteTodoItem(todoIndex))

    return todoLi;
}

function saveTodos() {
    TodoJSON = JSON.stringify(allTodos);
    localStorage.setItem('todos', TodoJSON)
}

function loadTodos() {
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos)
}
