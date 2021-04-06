import React from 'react'
import './animatedBackground.css'

export default function AnimatedBackground({urlSource}){

    return <div className="animated-background-container">
        <video className="background-video" preload="auto" autoPlay={true} loop={true}>
            <source src={urlSource} type="video/mp4"/>
        </video> 
    </div>
}