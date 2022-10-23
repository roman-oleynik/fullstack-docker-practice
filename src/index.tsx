import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
import { App, Todos } from './components/App';
import './styles/index.scss';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: '/todos',
            element: <Todos />
        }
      ],
    },
  ]);

const container = document.getElementById('root');
const root = createRoot(container); 


root.render(<RouterProvider router={router} />);
