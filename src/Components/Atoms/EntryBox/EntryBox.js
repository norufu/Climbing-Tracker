import React, { useEffect, useState } from 'react';
import VideoPreview from '../VideoPreview/VideoPreview';
import "./EntryBox.css"

export default function EntryBox({info, clickHandler}) {
    const [boxInfo, setBoxInfo] = useState(info);
    const [colour, setColour] = useState("var(--" + info.difficulty + "c)")
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if(info) {
            let objInfo = JSON.parse(info);
            setColour("var(--" + objInfo.difficulty + "c)")
            setBoxInfo(objInfo);
        }
    }, [info]);

    const dataPrint = (e) => {
        console.log(boxInfo);
    }

    const mouseEnterHandler = (e) => {
        console.log(e);
        setShowPreview(true);
    }
    const mouseLeaveHandler = (e) => {
        console.log(e);
        setShowPreview(false);
    }

    return <div onClick={dataPrint} className={'entryBox'} style={{backgroundColor: colour}} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
        <div className='difficulty'>
            <p>{boxInfo.difficulty}</p>
        </div>
        <div className='details'>
            <p>{boxInfo.location}</p>
            <p>{boxInfo.description}</p> 
         </div>
         {showPreview && <VideoPreview url={'https://www.youtube.com/embed/6qrVzDOC7Fo?autohide=1&controls=0&modestbranding=1'} ></VideoPreview>}
    </div>
       
}