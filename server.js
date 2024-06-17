const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory array to store todos
let todos = [];
let nextId = 1;

// Routes
app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: nextId++,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.title = req.body.title !== undefined ? req.body.title : todo.title;
    todo.completed =
      req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
