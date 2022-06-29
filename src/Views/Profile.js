import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import SectionTitle from '../Components/Molecules/SectionTitle';
import '../CSS/Profile.css';


export default function Profile() {
    const [profileData, setProfileData] = useState();

    useEffect(() => {
        //get the user's study data
        Axios.get("http://localhost:5001/profile", {params: {token: localStorage.getItem("token")}}).then(function(response) {
            let data = response.data;    
            console.log(data);
            setProfileData(data);
        })
    }, []); 

    function updateHandler(e) {
        e.preventDefault();
        let userData = {};
        let isPrivate = document.getElementById('privacySelect');
        userData['isPrivate'] = true;
        console.log(userData);

        Axios.post("http://localhost:5001/profile", {token: localStorage.getItem("token"), data: userData}).then(function(response) {
            alert(response.data.message);
        })
    }

  return(
  <div className='profileWrapper'>
    {profileData && <SectionTitle title={profileData.username + "'s Settings"}></SectionTitle>}
    <form id="settingsForm" onSubmit={updateHandler}>
        <label for="private">Profile Privacy:</label>
        <select name="private" id="privacySelect">
            <option value="true">Private</option>
            <option value="false">Public</option>
        </select>
        <button onClick={updateHandler} type='submit' className="submitButton">Update</button>
    </form>
  </div>)
}