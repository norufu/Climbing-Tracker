import React, { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav({url, width, height}) {


  return <div id='navDiv'>
    <a id="logo">
        <img src="../../../public/logo.svg"></img>
    </a>
    <a>Dashboard</a>
  </div>
}