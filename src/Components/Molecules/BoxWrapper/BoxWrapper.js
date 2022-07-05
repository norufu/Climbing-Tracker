import React, { useEffect, useState } from 'react';
import EntryBox from '../../Atoms/EntryBox/EntryBox';
import "./BoxWrapper.css"

export default function BoxWrapper({data}) {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        if(data) {
            //order from most recent
            let orderedData = data.sort((a, b) => (a.date > b.date) ? 1 : -1)

            let tempBoxes = []
            for(let i = 0; i < orderedData.length; i++) {
                let k = orderedData[i].difficulty + "box" + i;
                tempBoxes.push(<EntryBox key={k} info={JSON.stringify(orderedData[i])}></EntryBox>) //stringify data so it updates properly
            }
            setBoxes(tempBoxes);
        }
    }, [data]);

    return <div className='boxWrapper'>
        {boxes}
        
    </div>
}