import React, { useState } from 'react';
import "./BoxWrapper.css"

export default function BoxWrapper({boxArr}) {

    return <div className='boxWrapper'>
        {boxArr}
    </div>
}