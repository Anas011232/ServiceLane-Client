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

const router = createBrowserRouter([
    {
    path: "/",
    Component:Root
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path:"/dashboard/add-service",
    Component:AddService
  },
  {
    path:"/dashboard/manage-service",
    Component:ManageService
  },
  {
    path:"/updateUser/:id",
    Component:UpdateUser,
    loader:({params})=>fetch(`http://localhost:3000/updateUser/${params.id}`)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        
          <RouterProvider router={router} />
        

    </AuthProvider>
  </StrictMode>,
)
