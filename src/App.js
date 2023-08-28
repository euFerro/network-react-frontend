// Import Pages
import './App.css';

// Import Components
import './components/MainLink'
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Profilepage from './pages/Profilepage';


function App() {

  const [user, setUser] = useState(undefined)

  function resizeMain() {
    const sidebar = document.querySelector('#side-bar');
    const main = document.querySelector('main');
    
    if (window.innerWidth >= 660) {
      main.style.width = window.innerWidth - sidebar.offsetWidth + 'px';
      main.style.left = sidebar.offsetWidth + 'px';
    } else {
      main.style.left = '0px';
      main.style.width = '100vw';
    }
    
  }

  function get_logged_user() {
    
    const logged_user = localStorage.getItem("logged_user");

    if (logged_user !== undefined) {
      setUser(logged_user);
      // alert(`User detected:  ${user}`)
    } else {
      // alert('NOT LOGGED IN, no user detected');
    }
  }

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.replace('/home');
    }

    resizeMain();
    window.addEventListener('resize', resizeMain);

    if (user === undefined) {
      console.log('USER NOT LOGGED IN');
      get_logged_user();
    } else {
      console.log('USER IS LOGGED IN');
    }
  })

  return (
      <div className="App">

      <nav>
          <Sidebar user={user}/>
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
