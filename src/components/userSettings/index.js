import React,{useContext, useEffect, useState} from 'react'

import AvatarPicker from 'components/avatarPicker'
import AccountSettingsForm from 'components/forms/settings/accountForm'
import PasswordSettingsForm from 'components/forms/settings/passwordForm'
import SearchSettingsForm from 'components/forms/settings/searchForm'

import './userSettings.css'
import GiftyContext from 'context/GiftyContext'
export default function UserSettings(){

    const {getSettings,isLogged} = useContext(GiftyContext)

    const [isLoading,setIsLoading] = useState(true)
    const  [displayName, setDisplayName] = useState('')
    const  [email, setEmail] = useState('')
    const  [about, setAbout] = useState('')
    const  [ratting, setRatting] = useState('g')

    useEffect(() =>{
        if(isLogged){
            getSettings().then(response => {
                if(response.success){
                    const {displayName,about,ratting,email} = response.userSettings
                    setDisplayName(displayName)
                    setEmail(email)
                    setAbout(about)
                    setRatting(ratting)
                    setIsLoading(false)
                }
            },[])
        }
    })
   
    return isLoading? null : <div className="settings-wrapper">
    <div className="settings-menu">
        <AvatarPicker/>
        <SettingsNav/>
    </div>
    <div className="settings-content">
         <AccountSettingsForm displayName={displayName} email={email} about={about}/>
         <SearchSettingsForm ratting={ratting}/>
         <PasswordSettingsForm/>       
    </div>
 </div>
}

function SettingsNav(){
    return <ul className="settings-nav">
        <li> <a href="#account" className="settings-nav-item"><i className="ss-icon ss-settings"></i>Account Settings</a></li>
        <li> <a href="#password" className="settings-nav-item"><i className="ss-icon ss-password"></i>Search Settings</a></li>
        <li> <a href="#password" className="settings-nav-item"><i className="ss-icon ss-password"></i>Password</a></li>
        <li> <a href="#delete" className="settings-nav-item"><i className="ss-icon ss-alert"></i>Remove account</a></li>
    </ul>
}