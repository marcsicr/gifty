import React from 'react'

import './popup.css'

export default function PopUpConfirm({title="Message title",message="Lorem ipsum dolor sin admet?",onConfirm = () =>{},onCancel = () =>{},show=false}){

    
    return <>
    {!show? null :
    <div className="popup">
        <div className="message-box-container">
            <div className="msgbox-flex">
                <h3 className="msgbox-title">{title}</h3>
                <p className="msgbox-text">{message}</p>
                <div className="msgbox-btns-container">
                    <button className="msgbox-btn confirm"onClick={onConfirm}>Confirm</button>
                    <button className="msgbox-btn cancel"onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    }
    </>
}