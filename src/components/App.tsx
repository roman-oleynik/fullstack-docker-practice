import React, { useState, useEffect } from 'react';

interface TodoItem {
  name: string
  isDone: boolean
  todoId: string
}

interface TodosResponse {
  Count: number
  Items: TodoItem[]
  ScannedCount: number
}

import '../styles/index.scss';
import { TodoItem } from './TodoItem';

export function App() {
  const [todos, setTodos] = useState<TodoItem[] | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('/api/todos')
    .then(res => {
      return res.json()
    })
    .then(({ Items }: TodosResponse) => {
      setTodos(Items)
    })
  }, []);

  const toggleIsDone = ({ todoId, isDone, name }: TodoItem) => {
    fetch(`/api/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        isDone: !isDone
      }),
    })
      .then(res => res.json())
      .then(data => {
        setTodos(todos.map(el => {
          if (el.todoId === todoId) {
            el.isDone = data.Item.isDone;
            return el;
          }
          return el;
        }))
      })
  };

  const removeTodo = (id: string) => {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setTodos(todos.filter(el => el.todoId !== id));
      })
  };

  const addTodo = (name: string) => {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        isDone: false
      }),
    })
      .then(res => res.json())
      .then((data) => {
        setTodos([...todos, {
          todoId: data.Item.todoId,
          name: data.Item.name,
          isDone: data.Item.isDone,
        }]);
      })
  };

  const editTodo = ({ todoId, isDone, name }: TodoItem) => {
    console.log(name)
    fetch(`/api/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        isDone
      }),
    })
      .then(res => res.json())
      .then((data) => {
        setTodos(todos.map(el => {
          if (el.todoId === todoId) {
            el.name = data.Item.name;
            return el;
          }
          return el;
        }));
      })
  };
  
  return (
    <div className="todoapp stack-large">
      <h1>Todo list</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          defaultValue={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn__primary btn__lg"
          disabled={inputValue === ''}
          onClick={() => addTodo(inputValue)}
        >
          Add
        </button>
      </form>
      <h2 id="list-heading">
        {todos ? todos.length : '...'} tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {
          todos === null ?
          'Loading...' :
          todos.length ? todos.map(el => {
            return (
              <TodoItem
                key={el.todoId}
                data={el}
                onToggleIsDone={() => toggleIsDone(el)}
                onEditName={(el) => editTodo(el)}
                onRemove={() => removeTodo(el.todoId)}
              />
            );
          }) :
          'Todo list is empty'
        }
      </ul>
    </div>
  );
}

export default App;
