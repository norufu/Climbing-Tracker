import Axios from 'axios'
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoFrame from '../Components/Atoms/VideoFrame/VideoFrame';
import SectionTitle from '../Components/Molecules/SectionTitle';
import '../CSS/Entry.css';

export default function Entry() {
    const { username, entryId } = useParams();

    useEffect(() => {
        Axios.get("http://localhost:5001/getEntry", {params: {username: username, entryId: entryId, token: localStorage.getItem("token")}}).then(function(response) {
            let data = response.data;    
            console.log(data);
        })
    }, []); 

    const deleteEntry = (e) => {
        Axios.post("http://localhost:5001/deleteEntry", {token: localStorage.getItem("token"), entryId: entryId}).then(function(response) {
            console.log(response);
        })
    }

    return <div id="entryWrapper">
        <SectionTitle title={"V4 Ottawa - 03/04/22"}></SectionTitle>
        <VideoFrame url={'https://www.youtube.com/embed/6qrVzDOC7Fo?autohide=1&controls=0&modestbranding=1'} width={window.innerWidth/2} height={window.innerWidth/2}></VideoFrame>
        <p>descriptino go here, 
            entry: {entryId}</p>
            <button onClick={deleteEntry}>delete entry</button>
    </div>
}