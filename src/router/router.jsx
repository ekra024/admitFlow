import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainLayout />,
    children: [
      {
        path:"/",
        Component: SignIn,
      },
      {
        path:"/signUp",
        Component: SignUp,
      }
    ]
    
  }
])

export default router;
