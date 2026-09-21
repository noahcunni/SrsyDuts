import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { CardContextProvider } from './context/CardContext.jsx';

/**
 * This is the react root. Evertime your frontend is downloaded,
 * this block runs, and initializes the frontend built with react.
 */
createRoot(document.getElementById('root')).render(
  /* StrictMode helps find bugs, doesn't add any funcitonality */
  <StrictMode>
    <>
      {/* Context Providers as seen below, almost make information into
      global variables, it's a much cleaner way of sharing data through the
      code .*/}
      <AuthContextProvider>
        <CardContextProvider>
          <RouterProvider router={router}/>
        </CardContextProvider>
      </AuthContextProvider>
    </>
  </StrictMode>
);
