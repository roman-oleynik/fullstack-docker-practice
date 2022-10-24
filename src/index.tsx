import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from 'react-router-dom';
import { App } from './components/App';
import './styles/index.scss';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
  ]);

const container = document.getElementById('root');
const root = createRoot(container); 


root.render(<RouterProvider router={router} />);
