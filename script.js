document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.querySelector('.todo-form');
    const inputField = document.querySelector('.input-field');
    const todoList = document.querySelector('.todo-list');

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    };

    const addTodoToDOM = (todo) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.isCompleted;

        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Видалити';

        checkbox.addEventListener('change', () => {
            todo.isCompleted = checkbox.checked;
            if (todo.isCompleted) {
                todoItem.classList.add('checked');
            } else {
                todoItem.classList.remove('checked');
            }
            saveTodos();
        });

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            todoItem.remove();
            removeTodoFromStorage(todo.text);
        });

        if (todo.isCompleted) {
            todoItem.classList.add('checked');
        }

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = inputField.value.trim();
        if (todoText === '') return;

        const todo = {
            text: todoText,
            isCompleted: false
        };

        addTodoToDOM(todo);
        saveTodoToStorage(todo);
        inputField.value = '';
    });

    const saveTodos = () => {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            todos.push({
                text: item.querySelector('.todo-text').textContent,
                isCompleted: item.querySelector('.todo-checkbox').checked
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const saveTodoToStorage = (todo) => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const removeTodoFromStorage = (text) => {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.text !== text);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    loadTodos();
});
