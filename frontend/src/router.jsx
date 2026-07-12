import { createBrowserRouter } from "react-router-dom";

import PublicLayout from './layouts/PublicLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';

import Landing from './pages/landing/Landing.jsx';
import Signup from './pages/auth/SignUp.jsx';
import Signin from './pages/auth/SignIn.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';

import Lesson from './pages/study/lesson/Lesson.jsx';
import Writing from './pages/study/writing/Writing.jsx';
import Typing from './pages/study/typing/Typing.jsx';
import Create from './pages/create/Create.jsx';

import ProtectedRoute from "./ProtectedRoute.jsx";

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {path: '/', element: <Landing/>},
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
                        ]
                    }
                ]
            }
        ]
    }
]); 
