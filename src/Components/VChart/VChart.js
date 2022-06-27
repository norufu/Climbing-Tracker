import React, { useEffect, useState } from 'react';
import './VChart.css';
import Bars from './Bars';
import XAxis from './XAxis';
import XAxisLabel from './XAxisLabel';

export default function VChart({width, height, data}) {
  const [fontSize, setFontSize] = useState(15);
  const [padding, setPadding] = useState(25);
  const [graphStart, setGraphStart] = useState(null);

  const [barCount, setBarCount] = useState(12);
  const [barWidth, setBarWidth] = useState()

  useEffect(() => {
    setBarWidth(width/barCount)
    // setPadding(fontSize + 10);
    setGraphStart(height-padding);
    // console.log(width/barCount);
    console.log(data);
  }, []);

  return <div id="vChart">
    <svg viewBox={`0 0 ${width} ${height}`}>
      {barWidth && <Bars barCount={barCount} barWidth={barWidth} barHeightStart={graphStart} data={data}></Bars>}
      {graphStart && <XAxis start={"0," + graphStart} end={width + "," + graphStart} stroke={1}></XAxis>}
      {barWidth && <XAxisLabel height={height-padding/2} barWidth={barWidth} fontSize={fontSize}></XAxisLabel>}
    </svg>
  </div>
}