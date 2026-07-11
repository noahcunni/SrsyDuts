import { createBrowserRouter } from "react-router-dom";

import PublicLayout from './unpack/layouts/PublicLayout.jsx';
import AuthLayout from './unpack/layouts/AuthLayout.jsx';
import AppLayout from './unpack/layouts/AppLayout.jsx';

import Landing from './unpack/pages/Landing.jsx';
import Signup from './unpack/pages/auth/Signup.jsx';
import Signin from './unpack/pages/auth/SignIn.jsx';
import Dashboard from './unpack/pages/dashboard/Dashboard.jsx';
import About from './unpack/About.jsx';

import Lesson from './unpack/pages/study/lesson/Lesson.jsx';
import Writing from './unpack/pages/study/writing/Writing.jsx';
import Typing from './unpack/pages/study/typing/Typing.jsx';
import Create from './unpack/pages/create/Create.jsx';

import ProtectedRoute from "./unpack/ProtectedRoute.jsx";

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
                            {path: 'typing', element: <Typing />},
                            {path: 'create', element: <Create />}
                        ]
                    }
                ]
            }
        ]
    }
]); 
