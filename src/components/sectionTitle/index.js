import React from 'react'
import {useLocation} from 'wouter'
import './sectionTitle.css'

export const ViewMoreLink = ({message,path}) =>{

    // eslint-disable-next-line no-unused-vars
    const [_, pushLocation] = useLocation();

    const onClick = (evt) =>{
        evt.preventDefault();
        pushLocation(path)
    }
    return <h2 className="view-more" onClick={onClick}>{message}</h2>
}

export default function SectionTitle({title,svg,viewMore}){

    return  <div className="section-title">
            <h2>{svg}{title}</h2>{viewMore}</div>
}