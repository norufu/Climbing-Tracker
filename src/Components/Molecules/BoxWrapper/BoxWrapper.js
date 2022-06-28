import React, { useEffect, useState } from 'react';
import EntryBox from '../../Atoms/EntryBox/EntryBox';
import "./BoxWrapper.css"

export default function BoxWrapper({data}) {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        console.log(data);
        let tempBoxes = []
        for(let key in data) {
            for(let i =0; i < data[key].length; i++) {
            let k = data[key][i].difficulty + "box" + i;
            tempBoxes.push(<EntryBox key={k} info={JSON.stringify(data[key][i])}></EntryBox>) //stringify data so it updates properly
            }
        }
        setBoxes(tempBoxes);
    }, [data]);

    return <div className='boxWrapper'>
        {boxes}
        
    </div>
}