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

    return <div>
            <input onChange={handleInput} type="text" value={input} placeholder="filter tag"></input>
            <button onClick={clickHandler}  value={input} type='submit' id = "searchButton" variant="light">Go</button>
        </div>
}