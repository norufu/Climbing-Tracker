import React, { useEffect, useState } from 'react';

export default function Bars({barCount, barWidth, barHeightStart, data}) {
    const [bars, setBars] = useState();

    useEffect(() => {
        let count = new Array(barCount).fill(0);
        for(let i =0; i < data.length; i++) {
            let ind = data[i].difficulty.substring(1);
            count[ind] = count[ind] + 1;
        }
        let barArr = new Array(barCount).fill(0).map((_, index) => {
            let gradient = 150-index*10;
            let colour = "rgba(" + gradient + "," + gradient + "," + gradient +")"
            console.log(data);
            let k = 'v' + index;
            let height = count[index] * 5; // need to adjust for max height
            // let height = Math.floor(Math.random() * (barHeightStart - 1 + 1) + 1); //will be based on data in future
            return (<rect className='svgBar' key={k} x={index*barWidth} y={barHeightStart-height} width={barWidth} height={height}
            style={{fill: colour, stroke: "pink", stroke: 1 }} />)
        })

        setBars(barArr);
    }, []);

    return (<>{bars}</>)
}