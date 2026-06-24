import { createBrowserRouter } from "react-router-dom";

import PublicLayout from './layouts/PublicLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';

import Landing from './pages/Landing.jsx';
import Signup from './pages/auth/Signup.jsx';
import Signin from './pages/auth/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';

import Lesson from './pages/study/lesson/Lesson.jsx';
import Writing from './pages/study/Writing.jsx';
import Typing from './pages/study/Typing.jsx';

import ProtectedRoute from "./ProtectedRoute.jsx";

import "./../index.css"

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
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {path: '/dashboard', element: <Dashboard/>},
                    {   
                        path: '/study', children: [
                            {path: 'lesson', element: <Lesson />},
                            {path: 'writing', element: <Writing />},
                            {path: 'typing', element: <Typing />}
                        ]
                    }
                ]
            }
        ]
    }
]); 
