import React, { useState, useEffect } from 'react';
import Axios from 'axios'


export default function Profile() {
    const [profileData, setProfileData] = useState();

    useEffect(() => {
        //get the user's study data
        Axios.get("http://localhost:5000/profile", {params: {token: localStorage.getItem("token")}}).then(function(response) {
            let data = response.data;    
            console.log(data);
            setProfileData(data);
        })
    }, []); 

    function updateHandler() {
        let userData = {};
        let inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            userData[inputs[i].id] = inputs[i].value;
        }    
        console.log(userData);

        Axios.post("http://localhost:5000/profile", {token: localStorage.getItem("token"), data: userData}).then(function(response) {
            alert(response.data.message);
        })
    }

  return(
  <div>
    profile
  </div>)
}