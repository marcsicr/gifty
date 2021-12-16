import React from 'react'
import {Link} from 'wouter'
import UserMenu from 'components/user/userMenu'
import './Header.css'

export default function Header(){


    return <header className="sticky">
        <div className="header-row">
            <div className="gifty-logo-container">
                <span className="logo-img">
                    <img src={process.env.PUBLIC_URL + '/static/img/gifty_logo.png'} alt=""/>
                </span>
                <span className="text-logo">GIFTY</span>
            </div>
            <div className="menu-container">
                <ul className="menu-list">
                    <li><Link className="menu-link" href={`/search/reactions`}>Reactions</Link></li>
                    <li><Link className="menu-link" href={`/search/entertainment`}>Entertainment</Link></li>
                    <li><Link className="menu-link" href={`/search/sports`}>Sports</Link></li>
                    <li><Link className="menu-link" href={`/search/cat`}>Cats</Link></li>
                    <li><Link className="menu-link" href={`/search/panda`}>Pandas</Link></li>
                    <li><Link className="menu-link r90" href={"/search/random"}>...</Link></li>
                </ul>
            </div>
            <UserMenu/>
        </div>


        
    </header>
}