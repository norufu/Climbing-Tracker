import React, { useEffect, useState } from 'react';
import "./EntryBox.css"

export default function EntryBox({info, clickHandler}) {
    const [boxInfo, setBoxInfo] = useState(info);
    const [colour, setColour] = useState("var(--" + info.difficulty + "c)")

    const dataPrint = (e) => {
        console.log(boxInfo);
    }

    return <div onClick={dataPrint} className={'entryBox'} style={{backgroundColor: colour}}>
        <div className='difficulty'>
            <p>{boxInfo.difficulty}</p>
        </div>
        <div className='details'>
            <p>{boxInfo.location}</p>
            <p>{boxInfo.description}</p>
        </div>
    </div>
       
}