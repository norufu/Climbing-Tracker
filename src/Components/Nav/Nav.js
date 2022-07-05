import React, { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav({loggedIn}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(loggedIn);
        console.log(loggedIn)
    }, [loggedIn]);

    async function handleLogout(e) {
        localStorage.removeItem("token"); //remove token on logout
        localStorage.removeItem("username"); //remove token on logout
    }

  return <div id='navDiv'>
    <div id="leftNav">
        <a href='/dashboard' id="logo">
            <img src="/Logo.svg"></img>
        </a>
        <a href='/search'>Search</a>
    </div>
    <div id="rightNav">
        {loggedIn && <a onClick={handleLogout} href="/login">Logout</a>}
        {!loggedIn && <a onClick={handleLogout} href="/login">Login</a>}
        {!loggedIn && <a onClick={handleLogout} href="/register">Register</a>}
    </div>
  </div>
}