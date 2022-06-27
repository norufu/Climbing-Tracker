import React, { useEffect, useState } from 'react';
import "../../CSS/AddForm.css"

//difficulty
//tags
//description
//video file/link
//location

export default function AddForm({clickHandler}) {
    return <div className='AddFormWrapper'>
        <form className='AddFormWrapper' onSubmit={clickHandler}>
            <label for="difficulty">Difficulty:</label>
            <select name="difficulty" id="difficulty">
                <option value="v0">v0</option>
                <option value="v1">v1</option>
                <option value="v2">v2</option>
                <option value="v3">v3</option>
                <option value="v4">v4</option>
                <option value="v5">v5</option>
                <option value="v6">v6</option>
                <option value="v7">v7</option>
                <option value="v8">v8</option>
                <option value="v9">v9</option>
                <option value="v10">v10</option>
                <option value="v11">v10+</option>
            </select>
            <label for="description">description:</label>
            <input name="description" type="text" id="description"></input>
            <label for="location">location:</label>
            <input name="location" type="text" id="location"></input>
            <label for="video">video:</label>
            <input name="video" type="text" id="video"></input>

            <button type='submit'>Submit</button>
       </form>
    </div>
       
}