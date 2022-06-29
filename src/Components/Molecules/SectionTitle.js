import React, { useEffect, useState} from 'react';


export default function SectionTitle({title}) {
    
    return(
    <div className="sectionTitle">
        <h1>{title}</h1>
        <hr className="solid"></hr>
    </div>)
}