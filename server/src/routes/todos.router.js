const express = require('express');


const { getTodos, addTodo, deleteTodo, getTodoById } = require('../services/todos.service');

const router = express.Router();
router.use(express.json())

router.get('/', async (req, res) => {
  try {
    const members = await getTodos()
    res.json(members)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: `Something went wrong`})
  }
});

// api endpoint for adding a new entry in the table
router.post('/', async (req, res) => {
  const todo = req.body;
  try {
    const newTodo = await addTodo(todo)
    res.json(newTodo)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: `Something went wrong`})
  }
})

router.put('/:id', async (req, res) => {
  const todo = req.body;
  const { id } = req.params;
  todo.todoId = id;
  try {
    const updatedTodo = await addTodo(todo);
    console.log(updatedTodo);
    res.json(updatedTodo)
  } catch (error) {
    console.error(err)
    res.status(500).json({err: `Something went wrong`})
  }
})

// api endpoint for deleting an entry in the table
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deletedTodo = await deleteTodo(id)
    res.json(deletedTodo)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: `Something went wrong`})
  }
})

// api endpoint for retrieving a table entry by id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const todo = await getTodoById(id);
    if (Object.keys(todo).length === 0) {
      res.status(404).send('Todo item not found');
    } else {
      res.status(200).json(todo)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({error: `Something went wrong`})
  }
})

module.exports = router;