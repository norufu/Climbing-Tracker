import React, { useEffect, useState } from 'react';
import "../../CSS/AddForm.css"

//difficulty
//tags
//description
//video file/link
//location

export default function AddForm({clickHandler}) {
    const [date, setDatae] = useState();

    useEffect(() => {
        //default to today/limit future
        let curDate = new Date()
        curDate = curDate.toISOString().split('T')[0];        
        setDatae(curDate);
    }, []);

    return <div className='AddFormWrapper'>
        <form  onSubmit={clickHandler}>
            <p>
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
            </p>
            <p>
                <label for="date">Date:</label>
                <input id = "date" name="date" type="date"
                    placeholder={date}
                    min="2000-01-01" max={date} ></input>
            </p>

            <p>
                <label for="location">location:</label>
                <input name="location" type="text" id="location"></input>
            </p>

            <p>   
                <label for="description">description:</label>
                <input name="description" type="text" id="description"></input>
            </p>
            <p>
                <label for="video">video:</label>
                <input name="video" type="text" id="video"></input>
            </p>


            <button type='submit'>Submit</button>
       </form>
    </div>
       
}