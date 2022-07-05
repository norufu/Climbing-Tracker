import React, { useState } from 'react';

export default function TagInput({addTagHandler}) {
    const [input, setInput] = useState('');

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const clickHandler = (e) => {
        addTagHandler(e);
        setInput("");
    }

    return <form id='tagInput'>
            <input id="tagIn" onChange={handleInput} type="text" value={input} placeholder="filter tag"></input>
            <button id="tagButton" onClick={clickHandler}  value={input} type='submit' variant="light">Go</button>
        </form>
}