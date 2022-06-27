import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import EntryBox from '../Components/Atoms/EntryBox/EntryBox';
import TagBubble from '../Components/Atoms/TagBubble/TagBubble';
import TagInput from '../Components/Molecules/TagInput';
import '../CSS/Search.css';
import { dataToBoxes, isToken } from './../Utils';
import BoxWrapper from '../Components/Molecules/BoxWrapper/BoxWrapper';

export default function Search() {
    const [tags, setTags] = useState([]);
    const [entryBoxes, setEntryBoxes] = useState([]);
    const [entryData, setEntryData] = useState([]);
    const [originalData, setOriginalData] = useState([]);


    useEffect(() => {
        if(isToken()) {
            Axios.get("http://localhost:5001/userData", {params: {token: localStorage.getItem("token")}}).then(function(response) {
                let data = response.data;    
                console.log(data);
                setEntryData(data);
                setOriginalData(data);
                setEntryBoxes(dataToBoxes(data));
            })
          }
    }, []);

    useEffect(() => { //update box array when tags updated
        filterData(originalData);
    }, [tags]);

    const filterData = (data) => {
        console.log(entryBoxes);
        console.log("yesh")
        if(tags.length <= 0) {
            console.log(entryBoxes)
            return;
        }
        let filteredData = {};
        for(let key in data) {
            filteredData[key] = [];
            for(let i = 0; i < data[key].length; i++) {
                let combinedData = "";
                for(let dk in data[key][i]) {
                    if(dk == "video") {
                        continue;
                    }
                    combinedData += data[key][i][dk];
                }
                combinedData.replace('undefined', '');
                let hasTags = true;
                for(let i = 0; i < tags.length; i++) {
                    if(!combinedData.includes(tags[i].key)) {
                        hasTags = false;
                        break;
                    }
                }
                if(hasTags) {
                    // console.log(combinedData)
                    // console.log(data[key][i])
                    console.log(combinedData)
                    filteredData[key].push(data[key][i]);
                }
            }
        }
        // setEntryData(filteredData);
        let b = dataToBoxes(filteredData)
        // setEntryBoxes([<EntryBox key={"ddd"} info={filteredData['v0']}></EntryBox>]);
        setEntryBoxes(dataToBoxes(filteredData));
    }

    const addTagHandler = (e) => {
        let newTag = e.target.value;
        
        setTags(oldData => {
            let isDup = false;
            let tagButton = <TagBubble key={newTag} id={newTag} text={newTag} removeTagHandler={removeTagHandler}></TagBubble>;
            
            if(oldData == undefined ) {
                return([tagButton]);
            }
            for(let i = 0; i < oldData.length; i++) { //check for dups
                if(oldData[i].key == newTag) {
                    isDup = true;
                }
            } 
            
            if(!isDup) {
                return [...oldData, tagButton]; //add new button
            }
            else {
                return[...oldData]; //was dup, return old set
            }
        })
        
        console.log(e.target)
        e.target.value = "";
    }

    const removeTagHandler = (e) => {
        let removeTag = e.target.value;

        setTags(oldData => {
            let newData = oldData.filter(function( tag ) {
                return tag.key !== removeTag;
              });
            return(newData);
        })
    }

    return <div id="searchWrapper">
        <TagInput addTagHandler={addTagHandler}></TagInput>
        <div>
            {tags}
        </div>
        <BoxWrapper boxArr={entryBoxes}></BoxWrapper>
        </div>
}