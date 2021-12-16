import React, { useContext, useEffect, useState } from 'react'
import Gifty from 'services/gifty/service'
import {useLocation} from 'wouter'

import './userMenu.css'
import GiftyContext from 'context/GiftyContext'

export default function UserMenu(){

    const [showMenu,setShowMenu] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [_, pushLocation] = useLocation();

    const ctx = useContext(GiftyContext);
    const {isLogged,username} =ctx
   
    useEffect( () =>{
        if(!isLogged)
            setShowMenu(false)
    },[isLogged])


    const openMenuHandler = () =>{
        if(isLogged){
            setShowMenu(true)
        }
    }

    const closeMenuHandler = () =>{
        setShowMenu(false)
    }

    

    const handleClick = () =>{
        if(!isLogged){
            pushLocation('/login')
        }
    }

    return (<>
        <div className="user-menu-container" onClick={handleClick} onMouseEnter={openMenuHandler} onMouseLeave={closeMenuHandler}>
            <div className="user-name-container">
                <img className="user-display-img" src="https://media.giphy.com/avatars/default5/80h.gif" alt="img"/>
                <div className="user-display-name">{ isLogged? username:"Login"}</div>
                {isLogged?<div className="caret-down"></div>:null}
            </div>

            {showMenu?
                    <ul className="user-options-list">
                        <li onClick={() => {pushLocation('/settings')}}>Settings</li>
                        <li onClick={() => {pushLocation('/favorites')}}>Favorites</li>
                        <li onClick={() =>Gifty.logout(ctx)}>Logout</li>
                    </ul>
               
                :null}
            
        </div>
        </>
    )
}