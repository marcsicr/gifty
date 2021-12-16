import React from 'react'

export default function CarouselItem({url,title,height,classes=''}){

    const itemClasses = `list-item ${classes}`
    return  <li className={itemClasses} style={{"height":`${height}px`}}>
                <img alt={title} className="item-picture" src={url}></img>
            </li>
}