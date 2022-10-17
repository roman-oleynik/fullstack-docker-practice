import React, { useState, useCallback } from 'react';
import { Outlet, Link } from "react-router-dom";

export function Counter() {
  const [count, setCount] = useState(0);
  return <>
    <button onClick={() => setCount(count - 1)}>-</button>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>+</button>
  </>
}

export function App() {
  return (
   <div>
    azazaza
    <Outlet />
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chars">Chars</Link>
        </li>
      </ul>
    </nav>
   </div>
  );
}