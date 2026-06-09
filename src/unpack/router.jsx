import { createBrowserRouter } from "react-router-dom";

import PublicLayout from './layouts/PublicLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';

import Landing from './pages/Landing.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {path: '/', element: <Landing/>},
            {path: '/about', element: <About/>}
        ]
    },{
        element: <AuthLayout />,
        children: [
            {path: '/signup', element: <Signup/>},
            {path: '/signin', element: <Signin/>}
        ]
    },{
        element: <AppLayout />,
        children: [
            {path: '/dashboard', element: <Dashboard/>}        ]
    }
]); 
