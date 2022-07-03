import React, { useEffect, useState } from 'react';
import EntryBox from '../../Atoms/EntryBox/EntryBox';
import "./BoxWrapper.css"

export default function BoxWrapper({data}) {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        console.log(data);
        if(data) {
            let tempBoxes = []
            for(let i = 0; i < data.length; i++) {
                let k = data[i].difficulty + "box" + i;
                tempBoxes.push(<EntryBox key={k} info={JSON.stringify(data[i])}></EntryBox>) //stringify data so it updates properly
            }
            setBoxes(tempBoxes);
        }
    }, [data]);

    return <div className='boxWrapper'>
        {boxes}
        
    </div>
}