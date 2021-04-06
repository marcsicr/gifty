import React from 'react'
import useController from './hook'

import './carousel.css'

export default function Carousel({numElements = 25,height=140,children}){

    const {previousRef, nextRef, scrollableRef,previousScroll,nextScroll} = useController()

    return (<div className="carousel-wrapper" style={{"--carousel-height":`${height}px`}}>
                
       { 
        <>
            <div ref={previousRef} className="previous init-hidden" onClick={previousScroll}>
                <svg width="15px" height="30px" viewBox="0 0 15 30" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" fill="none"><g transform="translate(-1017.000000, -82.000000)" fill="#a6a6a6"><g><g transform="translate(1.000000, 27.000000)"><polygon points="1031 70.0000018 1030.1866 69.0556352 1018.01759 55 1016 56.888726 1027.35562 70.0000018 1016 83.111274 1018.01759 85 1030.1866 70.9443648"></polygon></g></g></g></g></svg>
            </div>
            <div ref={nextRef} className="next" onClick={nextScroll}>
                <svg width="15px" height="30px" viewBox="0 0 15 30" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" fill="none"><g transform="translate(-1017.000000, -82.000000)" fill="#a6a6a6"><g><g transform="translate(1.000000, 27.000000)"><polygon points="1031 70.0000018 1030.1866 69.0556352 1018.01759 55 1016 56.888726 1027.35562 70.0000018 1016 83.111274 1018.01759 85 1030.1866 70.9443648"></polygon></g></g></g></g></svg>
            </div>
            <div className="list-wrapper">
                <ul ref={scrollableRef} className="list">
                {
                    children
                }
                </ul>
            </div>
        </>
       }
        
   </div>)
}