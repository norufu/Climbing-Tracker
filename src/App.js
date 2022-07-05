import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/App.css';

import Home from './Views/Home';
import Register from './Views/Register';
import Login from './Views/Login';
import Profile from './Views/Profile';
import Dashboard from './Views/Dashboard';
import Search from './Views/Search';
import Entry from './Views/Entry';
import Nav from './Components/Nav/Nav';
import { useEffect, useState } from 'react';
// import ProtectedRoute from './Components/ProtectedRoute';
// import Navigation from './Components/Navigation';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  const loginNavHandler = (e) => {
    setLoggedIn(true);
  }
  
  return (
    <>
    <Nav loggedIn={loggedIn}></Nav>

    <div className="wrapper">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login loginNavHandler={loginNavHandler}/>}/>
          <Route path="/register" element={<Register loginNavHandler={loginNavHandler}/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/:username" element={<Dashboard />}/>
          <Route path="/:username/:entryId" element={<Entry />}/>
          <Route path="/:username/search" element={<Search />}/>

      </Routes>
      </BrowserRouter>
    </div></>
  );
}

export default App;
