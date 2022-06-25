import React, { useEffect, useState } from 'react';

export default function XAxisLabel({height, barWidth, fontSize}) {
    const [labels, setLabels] = useState();

    useEffect(() => {
        let labelText = ['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10', 'v11+']
        let labelArr = new Array(labelText.length).fill(0).map((_, index) => {

            let x = barWidth * index + barWidth/2;
            let y = height;
            return(
            <text key={index} x={x} y={y}
            style={{
              fill: "#808080",
              fontSize: fontSize,
              fontFamily: "Helvetica",
              textAnchor: "middle"
            }}
          >
            {labelText[index]}
          </text>)
        })

        setLabels(labelArr);
    }, []);
  return (<>{labels}</>
  )
}