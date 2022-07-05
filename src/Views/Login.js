import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../CSS/Login.css';


export default function Login({loginNavHandler}) {
  let navigate = useNavigate(); 
  const [details, setDetails] = useState({ email: "", password: ""});

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(details);
    if(details.email && details.password) {
      Axios.post("http://localhost:5001/login", details).then(function(response) {
        console.log("uhhh");
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        loginNavHandler();
        navigate('../dashboard');

        // console.log("hadsfah")
      }).catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
    }
    else {
      alert("Fill in all fields");
    }    
  }
  
  return(
  <div id="loginWrapper">
    <form onSubmit={handleSubmit}>
      <table>
          <tr>
            <td><label>Email: </label></td>
            <td><input id ="email" name = "email" type="text" onChange={e => setDetails({...details, email: e.target.value})}></input></td>
          </tr>
          <tr>
          <td><label>Password: </label></td>
          <td><input id ="password" name = "password" type="text" onChange={e => setDetails({...details, password: e.target.value})}></input></td>
          </tr>
      </table>
      <button id="formSubmitButton" type="submit">Submit</button>
    </form>
  </div>

  )
}