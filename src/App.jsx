import Navbar from './navbar/Navbar.jsx'
import Home from './dashboard/Home.jsx'
import About from './about/About.jsx'
import Writing from './study/writing/Writing.jsx'
import Typing from './study/typing/Typing.jsx'
import ErrorPage from './handle/ErrorPage.jsx'
import { Routes, Route } from 'react-router-dom'
import './index.css';

function App() {
  
  return(
    <div className='app'> 
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/writing' element={<Writing/>} />
        <Route path='/typing' element={<Typing/>} />
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App
