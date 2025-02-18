import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import Schedule from './Pages/Schedule/Schedule';
import AddBooking from './Pages/AddBooking/AddBooking';
import Profile from './Components/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:'',
        element: <Schedule></Schedule>
      },
      {
        path:'/addBooking',
        element: <AddBooking></AddBooking>
      },
      {
        path:'/profile',
        element: <Profile></Profile>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
