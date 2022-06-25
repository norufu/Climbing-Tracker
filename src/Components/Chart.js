import React from 'react';




export default function Chart({data, width, height, numberOfHorizontalGuides, numberOfVerticalGuides}) {
    const data1 = [{date: "22/02/02", label: "deadlift", x: 0, y:0},
    {date: "22/02/03", label: "deadlift", x: 0, y:0},
    {date: "22/02/04", label: "deadlift", x: 5, y:5},
    {date: "22/02/05", label: "deadlift", x: 10, y:10},]
    const padding = 10;
    const precision = 0;
    const STROKE = 1;
    const FONT_SIZE = width / 50;

    const maximumXFromData = Math.max(...data1.map(e => e.x));
    const maximumYFromData = Math.max(...data1.map(e => e.y));

    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data1
    .map(element => {
      const x = (element.x / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(" ");
    
    const Axis = ({ points }) => (
        <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
      );
    
      const XAxis = () => (
        <Axis
          points={`${padding},${height - padding} ${width - padding},${height -
            padding}`}
        />
      );
    
      const YAxis = () => (
        <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
      );

      const VerticalGuides = () => {
        const guideCount = numberOfVerticalGuides || data.length - 1;
    
        const startY = padding;
        const endY = height - padding;
    
        return new Array(guideCount).fill(0).map((_, index) => {
          const ratio = (index + 1) / guideCount;
    
          const xCoordinate = padding + ratio * (width - padding * 2);
    
          return (
            <React.Fragment key={index}>
              <polyline
                fill="none"
                stroke="#ccc"
                strokeWidth=".5"
                points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
              />
            </React.Fragment>
          );
        });
      };
    
      const HorizontalGuides = () => {
        const startX = padding;
        const endX = width - padding;
    
        return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
          const ratio = (index + 1) / numberOfHorizontalGuides;
    
          const yCoordinate = chartHeight - chartHeight * ratio + padding;
    
          return (
            <React.Fragment key={index}>
              <polyline
                fill="none"
                stroke={"#ccc"}
                strokeWidth=".5"
                points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
              />
            </React.Fragment>
          );
        });
      };

      const LabelsXAxis = () => {
        const y = height - padding + FONT_SIZE * 2;
    
        return data1.map((element, index) => {
          const x =
            (element.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
          return (
            <text
              key={index}
              x={x}
              y={y}
              style={{
                fill: "#808080",
                fontSize: FONT_SIZE,
                fontFamily: "Helvetica"
              }}
            >
              {element.label}
            </text>
          );
        });
      };
      
      const LabelsYAxis = () => {
        const PARTS = numberOfHorizontalGuides;

        return new Array(PARTS + 1).fill(0).map((_, index) => {
          const x = FONT_SIZE;
        //   const ratio = index / 1;
          const ratio = index / numberOfHorizontalGuides;
    
          const yCoordinate =
            chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
          return (
            <text
              key={"index"}
              x={x}
              y={yCoordinate}
              style={{
                fill: "#808080",
                fontSize: FONT_SIZE,
                fontFamily: "Helvetica"
              }}
            >
              {parseFloat(maximumYFromData * (index / PARTS)).toFixed(precision)}
            </text>
          );
        });
      };
    return (
        <svg
          viewBox={`0 0 ${width} ${height +20}`}
          //style={{ border: "0.5px solid #ccc" }}
        >
          <XAxis />
          <LabelsXAxis />
          <YAxis />
          <LabelsYAxis />
          {numberOfVerticalGuides && <VerticalGuides />}
          <HorizontalGuides />
    
        {/* <XAxis /> */}
        {/* <LabelsXAxis /> */}

        {/* <YAxis /> */}
        {/* <LabelsYAxis /> */}

        <polyline
            fill="none"
            stroke="#0074d9"
            strokeWidth={STROKE}
            points={points}
        />
        </svg>
      );
}