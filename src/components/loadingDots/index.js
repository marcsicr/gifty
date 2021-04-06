import React from 'react'
import './loadingDots.css'

export default function LoadingDots(){

    return <div className="loader">
                <div color="#00ff99" className="dot first"></div>
                <div color="#00ccff" className="dot second"></div>
                <div color="#9933ff" className="dot third"></div>
                <div color="#ff6666" className="dot fourth"></div>
                <div color="#fff35c" className="dot fifth"></div>
            </div>

}