import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../CSS/Register.css';

import { useNavigate } from "react-router-dom";

export default function Register({loginNavHandler}) {
  let navigate = useNavigate(); 
  const [user, setUser] = useState({ email: "", username: "", password: "", passwordConfirm: ""});


  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    console.log(user);
    if(user.email && user.username && user.password && user.passwordConfirm) {
      Axios.post("http://localhost:5001/register", user).then(function(response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", user.username);
        loginNavHandler();
        navigate('../dashboard');
      }).catch(function (error) {
        if (error.response) {
          alert(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    }
    else {
      alert("Fill in all fields");
    }  
  }

  return (
    <div id="registerWrapper">
      <form onSubmit={handleSubmit}>
        <table>
            <tr>
              <td><label>Email: </label></td>
              <td><input id ="email" name = "email" type="text" onChange={e => setUser({...user, email: e.target.value})}></input></td>
            </tr>
            <tr>
              <td><label>Username: </label></td>
              <td><input id ="username" name = "username" type="text" onChange={e => setUser({...user, username: e.target.value})}></input></td>
            </tr>
            <tr>
              <td><label>Password: </label></td>
              <td><input id ="password" name = "password" type="text" onChange={e => setUser({...user, password: e.target.value})}></input></td>
            </tr>
            <tr>
              <td><label>Confirm Password: </label></td>
              <td><input id ="passwordConfirm" name = "passwordConfirm" type="text" onChange={e => setUser({...user, passwordConfirm: e.target.value})}></input></td>
            </tr>
        </table>
        <button id="formSubmitButton" type="submit">Submit</button>
      </form>


    </div>
  );
}