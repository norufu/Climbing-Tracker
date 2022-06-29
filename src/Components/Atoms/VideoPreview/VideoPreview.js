import React, { useEffect, useState } from 'react';
import VideoFrame from '../VideoFrame/VideoFrame';
import './VideoPreview.css';

export default function VideoPreview({url}) {

  return <div className='preview'>
    <VideoFrame url={url} width={150} height={150}></VideoFrame>
  </div>
}