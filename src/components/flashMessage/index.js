import React from 'react'
import './flashMessage.css'
export default function FlashMessage({containerRef, message="Lorem Ipsum"}){

return <div ref={containerRef} className="flash-message-container">
        <h2 className="flash-message">{message}</h2>
    </div>
}