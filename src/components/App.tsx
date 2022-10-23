import React, { useState, useCallback, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";

interface TodoItem {
  name: string
}

export function Todos() {
  const [data, setData] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetch('/api/todos')
    .then(res => {
      return res.json()
    })
    .then(d => setData(d.todos))
  }, []);
  console.log(data);
  return <>{data.map(el => <h1>{el.name}</h1>)}</>;
}

export function App() {
  return (
   <div>
    <Outlet />
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
      </ul>
    </nav>
   </div>
  );
}