import React, { useEffect, useState } from 'react'
import {useLocation} from 'wouter'
import {useUser} from 'hooks/useUser'

import './userMenu.css'

export default function UserMenu(){

    const [showMenu,setShowMenu] = useState(false)
    const [_, pushLocation] = useLocation();

    const {isLogged,logout,username} = useUser();

    
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
                <img className="user-display-img" src="https://media.giphy.com/avatars/default5/80h.gif"/>
                <div className="user-display-name">{ isLogged? username:"Login"}</div>
                {isLogged?<div className="caret-down"></div>:null}
            </div>

            {showMenu?
                    <ul className="user-options-list">
                        <li>Settings</li>
                        <li onClick={() => {pushLocation('/favorites')}}>Favorites</li>
                        <li onClick={logout}>Logout</li>
                    </ul>
               
                :null}
            
        </div>
        </>
    )
}