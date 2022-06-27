import React, { useEffect, useState } from 'react';
import './TagBubble.css';

export default function TagBubble({text, removeTagHandler}) {
  const [colour, setColour] = useState();
  useEffect(() => {
    switch(text.toLowerCase()) {
      case "dyno":
        setColour({backgroundColor: 'rgb(150,50,250)'})
        break;
      case "v0":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v1":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v2":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v3":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v4":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v5":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v6":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v7":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v8":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v9":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v10":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "v10+":
        setColour({backgroundColor: 'rgb(230,50,50)'})
        break;
      case "indoor":
        setColour({backgroundColor: 'rgb(50,100,200)'})
        break;
      case "outdoor":
        setColour({backgroundColor: 'rgb(50,160,70)'})
        break;
      default:
        setColour({backgroundColor: 'rgb(200,200,200)'})
        // code block
    }
  }, []);
  return <button style={colour} className='tagBubble' value={text} onClick={removeTagHandler}>{text}</button>
}