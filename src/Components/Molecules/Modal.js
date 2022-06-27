import React, { useEffect, useState } from 'react';
import "../../CSS/Modal.css"
export default function Modal({closeHandler, show, children}) {
    const [showClass, setShowClass] = useState(show ? "modal display-block" : "modal display-none");

    useEffect(()=> { //toggle show
        setShowClass(show ? "modal display-block" : "modal display-none")
    }, [show])
    return (   
    <div className={showClass}>
        <section className="modalSection">
        {children}
        <button className='modalClose' onClick={closeHandler}>close</button>
        </section>
    </div>)
}