import React, { useEffect, useState } from 'react';
import "./EntryBox.css"

export default function EntryBox({info, clickHandler}) {
    const [boxInfo, setBoxInfo] = useState(info[0]);
    return <div className='entryBox'>
        <div className='difficulty'>
            <p>{boxInfo.difficulty}</p>
        </div>
        <div className='details'>
            <p>{boxInfo.location}</p>
            <p>{boxInfo.description}</p>
        </div>
    </div>
       
}