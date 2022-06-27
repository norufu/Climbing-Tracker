import React, { useEffect, useState } from 'react';
import './AddButton.css';

export default function AddButton({text, clickHandler}) {

    return <button className='addButton' value={text} onClick={clickHandler}>{text}</button>
}