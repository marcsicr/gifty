import React from 'react'


import './detailedGif.css'
export default function DetailedGif({url,title,source,size,rating,import_datetime,width,height}){

    const date = new Date(import_datetime)
   
    return <div className="gif-details-wrapper">
        <div className="gif-picture">
            <h3>{title}</h3>
            <a href={source}>
                <img src={url} alt="gif"/>
            </a>
        </div>
        <div className="gif-details">
            <h3>Details</h3>
            <ul className="gif-details-list">
                <li><b>Dimensions:</b> {width} x {height} px</li>
                <li><b>Rating:</b> {String(rating).toUpperCase()}</li>
                <li><b>Size:</b> {Math.ceil(size / 1024)} Kilobytes</li>
                <li><b>Created:</b> {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</li>
            </ul>

            <div className="share-gif">
                <h3>Share it!</h3>
                <div className="share-icons">
                    <a href="/" title="Share to Facebook"><span className="share-icon share-fbk"></span></a>
                    <a href="/" title="Share to Instagram"><span className="share-icon share-insta"></span></a>
                    <a href="/" title="Share to Twitter"><span className="share-icon share-twitter"></span></a>
                    <a href="/" title="Share to Pinterest"><span className="share-icon share-pinterest"></span></a>
                    <a href="/" title="Share to Reddit"><span className="share-icon share-reddit"></span></a>
                </div>
            </div>
        </div>
        
    </div>
}