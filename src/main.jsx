import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Components/Root/Root.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import AuthProvider from './Components/Context/AuthProvider.jsx';
import AddService from './Components/AddService/AddService.jsx';
import ManageService from './Components/ManageService/ManageService.jsx';
import UpdateUser from './Components/UpdateUser/UpdateUser.jsx';
import AllServices from './Components/AllServices/AllServices.jsx';
import SingleService from './SingleService/SingleService.jsx';
import BookedServices from './Components/BookedServices/BookedServices.jsx';
import ServiceToDo from './Components/ServiceToDo/ServiceToDo.jsx';
import PrivateRoute from './Components/Context/PrivateRoute/PrivateROute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/dashboard/add-service",
    element: <PrivateRoute> <AddService></AddService> </PrivateRoute>
  },
  {
    path: "/dashboard/manage-service",
    element: <PrivateRoute> <ManageService></ManageService> </PrivateRoute>
  },
  {
    path: "/updateUser/:id",
    element: <PrivateRoute> <UpdateUser></UpdateUser> </PrivateRoute>,
    loader: ({ params }) => fetch(`http://localhost:3000/updateUser/${params.id}`)
  },
  {
    path: "/services",
    Component: AllServices,
    loader: () => fetch('http://localhost:3000/users')
  },
  {
    path: "/service/:id",
    element: <PrivateRoute> <SingleService></SingleService> </PrivateRoute>,
    loader: ({ params }) => fetch(`http://localhost:3000/service/${params.id}`)
  },
  {
    path: "/dashboard/booked-services",
    element: <PrivateRoute> <BookedServices></BookedServices> </PrivateRoute>
  },
  {
    path: "/dashboard/service-todo",
    element: <PrivateRoute> <ServiceToDo></ServiceToDo> </PrivateRoute>,
    loader: () => fetch("http://localhost:3000/bookings")
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

      <RouterProvider router={router} />


    </AuthProvider>
  </StrictMode>,
)
