import React, { useState, useEffect } from 'react';
import TagBubble from '../Components/Atoms/TagBubble/TagBubble';
import TagInput from '../Components/Molecules/TagInput';
import '../CSS/Search.css';

export default function Search() {
    const [tags, setTags] = useState([]);

    useEffect(() => {

    }, [tags]);

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
        </div>
}