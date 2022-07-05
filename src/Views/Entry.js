import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoFrame from '../Components/Atoms/VideoFrame/VideoFrame';
import SectionTitle from '../Components/Molecules/SectionTitle';
import '../CSS/Entry.css';
import { useNavigate } from "react-router-dom";

export default function Entry() {
    const { username, entryId } = useParams();
    const [data, setData] = useState();
    const [title, setTitle] = useState();
    let navigate = useNavigate(); 

    useEffect(() => {
        Axios.get("http://localhost:5001/getEntry", {params: {username: username, entryId: entryId, token: localStorage.getItem("token")}}).then(function(response) {
            let data = response.data;    
            console.log(data);
            setData(data);
            setTitle(data.difficulty + " " + data.location + " - " + data.date)
        })
    }, []); 

    const deleteEntry = (e) => {
        console.log(username, entryId);
        Axios.post("http://localhost:5001/deleteEntry", {username: username, token: localStorage.getItem("token"), entryId: entryId}).then(function(response) {
            navigate('../dashboard');
        })
    }

    return <div id="entryWrapper">
    {data && <>
        <SectionTitle title={title}></SectionTitle>

        {/* <VideoFrame url={'https://www.youtube.com/embed/6qrVzDOC7Fo?autohide=1&controls=0&modestbranding=1'} width={window.innerWidth/2} height={window.innerWidth/2}></VideoFrame> */}
        <p>{data.description}</p>
        <button className='deleteEntry' onClick={deleteEntry}>delete entry</button>
    </>}

    </div>
}