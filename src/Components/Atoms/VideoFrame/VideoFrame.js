import React, { useEffect, useState } from 'react';
import './VideoFrame.css';

export default function VideoFrame({url, width, height}) {

    useEffect(() => { //format the video here

    }, []);

  return <iframe width={width} height={height} 
      src={url}>
    </iframe>
}