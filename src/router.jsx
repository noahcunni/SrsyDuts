import { createBrowserRouter } from "react-router";
import Signup from './pages/study/lognsign/Signup.jsx';
import Login from './pages/study/lognsign/Login.jsx';
import Home from './dashboard/Home.jsx';
import App from "./App.jsx";

export const router = createBrowserRouter([
    {path: "/", element: <Login/>},
    {path: "/signup", element: <Signup/>},
    {path: "/login", element: <Login/>},
    {path: "/home", element: <Home/>}
]); 
