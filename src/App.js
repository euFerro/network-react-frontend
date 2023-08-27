// Import Pages
import './App.css';

// Import Components
import './components/MainLink'
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Profilepage from './pages/Profilepage';


function App() {

  function resizeMain() {
    const sidebar = document.querySelector('#side-bar');
    const main = document.querySelector('main');
    
    if (window.innerWidth >= 660) {
      main.style.width = window.innerWidth - sidebar.offsetWidth + 'px';
      main.style.left = sidebar.offsetWidth + 'px';
    } else {
      main.style.left = 0 + 'px';
      main.style.width = '100vw';
    }
    
  }

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.replace('/home');
    }
    resizeMain();
    window.addEventListener('resize', resizeMain);
  })

  return (
      <div className="App">

      <nav>
          <Sidebar/>
      </nav>
          
      <main>
          <div className="main">
            <Routes>
              <Route path='/home' element={<Homepage/>}/>
              <Route path='/search'/>
              <Route path='/profile' element={<Profilepage/>}/>
              <Route path='/login' element={<Loginpage/>}/>
              <Route path='/register' element={<Registerpage/>}/>
            </Routes>
          </div>
      </main>

      </div>
  );
}

export default App;
