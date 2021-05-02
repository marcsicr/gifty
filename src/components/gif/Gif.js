import React, {useState,useEffect, useContext} from 'react'

import {useUser} from 'hooks/user/useUser'
import FavsContext from 'context/FavsContext'



import './Gif.css'
import PopUpConfirm from 'components/popUpConfirm'
import { SHARE_IMG } from 'img/IMGS'

export const COLORS = ['g','b','p','r','y']
export default function Gif({id,title,url,username,avatar_url,color = 0}){

   
    return (
        <div className={`gif ${COLORS[color]}`} >
            <img className="content-img" alt={title} loading="lazy" src={url} />
            <GifOverlay id={id}/>
            {
                
                username !== ''? 
                <div className="gif-info">
                    
                    <div className="gif-info-data">
                        <div className="user-avatar">
                            <img className="user-avatar"src={avatar_url}/>
                        </div>
                        <span className="user-name">{username}</span>
                    </div>
                </div>
                :
                null
            }
            
        </div>
    )
}

function GifOverlay({id}){

    const {favs,isFavsLoading,addToFavs,isGifFav,removeFav} = useContext(FavsContext)
    const[isFavorite,setIsFavorite] = useState(false)
    const [showPopup,setShowPopUp] = useState(false)
    const {isLogged} = useUser()


    useEffect( () =>{
        if (isFavsLoading) return;
        setIsFavorite(isGifFav(id))
    },[isFavsLoading])

    useEffect(() => {

        if(isFavsLoading) return;
        
        if(!isGifFav(id)){
            
            setIsFavorite(false)
        }
    },[favs])

    
    const toggleThisGifFromFavs = async () =>{
        if(!isFavorite){
            let isFav = await addToFavs(id)
            console.log("The is fav", isFav)
            setIsFavorite(isFav)
        }else{
            setShowPopUp(true)
        }
    }

    const removeGifFromFav = async () =>{
        await removeFav(id)
        setIsFavorite(false)
        setShowPopUp(false)
    }

    const onRemoveCanceled = () =>{
        setShowPopUp(false)
    }

    return (
    <>
    <PopUpConfirm title={"Remove favorite"} message={"Do you want to remove this Gif from favorites?"} onConfirm={removeGifFromFav} onCancel={onRemoveCanceled} show={showPopup}/> 
    {isLogged? 
    
        <div className="gif-actions-overlay">    
            <div className="gif-actions-bar">
                <svg className={ isFavorite? "heart favorite": "heart" } onClick={toggleThisGifFromFavs}>
                <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                </svg>
                <SHARE_IMG/>
            </div>     
        </div>
    : null }
    </>)
}