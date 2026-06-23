import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './unpack/router.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { CardContextProvider } from './context/CardContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <AuthContextProvider>
        <CardContextProvider>
          <RouterProvider router={router}/>
        </CardContextProvider>
      </AuthContextProvider>
    </>
  </StrictMode>
)
