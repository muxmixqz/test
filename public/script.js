const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');

// โหลด todo list
async function loadTodos() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.done ? 'done' : '';
        li.innerHTML = `
            <span>${todo.task}</span>
            <div>
                <button onclick="toggleDone(${todo.id}, ${!todo.done})">
                    ${todo.done ? 'Undo' : 'Done'}
                </button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// เพิ่ม todo
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        });
        taskInput.value = '';
        loadTodos();
    }
});

// เปลี่ยนสถานะ Done/Undo
async function toggleDone(id, done) {
    await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done })
    });
    loadTodos();
}

// ลบ todo
async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    loadTodos();
}

// โหลด todo เมื่อหน้าเว็บเปิด
loadTodos();
