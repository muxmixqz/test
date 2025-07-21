    const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // เสิร์ฟไฟล์ HTML, CSS, JS

// ตัวอย่างข้อมูล Todo
let todos = [
    { id: 1, task: 'Learn JavaScript', done: false },
    { id: 2, task: 'Build API Server', done: false }
];

// GET: ดึงข้อมูล todo ทั้งหมด
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST: เพิ่ม todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        task: req.body.task,
        done: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT: อัพเดทสถานะ todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.done = req.body.done;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// DELETE: ลบ todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`API Server is running at http://localhost:${PORT}`);
});
