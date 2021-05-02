import React,{useEffect, useState,useContext} from 'react'

import {getUserSettings} from 'services/gifty/API'
import AvatarPicker from 'components/avatarPicker'
import FormContainer, {FormInput,FormButton,FormPassword,FormSelect,FormTextArea} from 'components/formContainer'
import {PasswordStrengthBar} from 'components/passwordStrengthBar'

import FlashMessageContext from 'context/FlashMessageContext'
import './userSettings.css'
import { useLoggedUser } from 'hooks/user/useLoggedUser'

export default function UserSettings(){

    const {showMessage} = useContext(FlashMessageContext)

    const {jwt} = useLoggedUser()
    
    const [isLoading,setIsLoading] = useState(true)

    const  [displayName, setDisplayName] = useState('')
    const  [email, setEmail] = useState('')
    const  [about, setAbout] = useState('')
    const  [ratting, setRatting] = useState('')

    useEffect(() =>{
        if(jwt !== null){
            getUserSettings(jwt).then(data => {
                const {displayName,about,ratting,email} = data.userSettings
                setDisplayName(displayName)
                setEmail(email)
                setAbout(about)
                setRatting(ratting)
                setIsLoading(false)
            },[])
        }
    })
   
    const[newPWDInput, setNewPWDInput] = useState("")
    
    const accountSettingsSubmit = (values)=> {
        
        console.log(values)
        showMessage({duration:4000, message:'Account settings saved :D'})
    }

    const searchSettingsSubmit = (values) =>{
        console.log(values);
        
    }

    const passwordSettingsSubmit = (values) => {
        console.log(values)
    }

    const ratingOps = [
        {value:"g",text:"All public"},
        {value:"pg",text:"Acceptable"},
        {value:"pg-13",text:"Acceptable + 13"},
        {value:"r",text:"Unrestricted + 18"},
    ]
    

    return isLoading? null : <div className="settings-wrapper">
    <div className="settings-menu">
        <AvatarPicker/>
        <SettingsNav/>
    </div>
    <div className="settings-content">
         <FormContainer elementID="account" title="Account Settings" submitFunc={accountSettingsSubmit} initValues={{email:email,displayName:displayName,about:about}}>
             <FormInput label="Display name" 
                        name="displayName" 
                        initialValue={displayName} 
            />
             <FormInput label="Email Address" name="email" initialValue={email}/>
             <FormTextArea label="About" name="about" initialValue={about}/>
             <FormButton text="Save"/>    
         </FormContainer>

         <FormContainer title="Search Settings" submitFunc={searchSettingsSubmit} initValues={{ratting:ratting}}>
             <FormSelect name="ratting" label="Rattings" options={ratingOps} defaultOption={ratting} />
             <FormButton text="Save"/>
         </FormContainer>

         <FormContainer elementID="password" title="Password Settings" submitFunc={passwordSettingsSubmit} initValues={{currentpwd:'',newpwd:'',repeatpwd:''}}>
             <FormPassword label="Current password" name="currentpwd"/>
             <FormPassword label="New password" name="newpwd" changeNotify={(value) =>{setNewPWDInput(value)}}/>
             <FormPassword label="Repeat new password" name="repeatpwd"/>
             <div className="align-left">
                 <PasswordStrengthBar password={newPWDInput}/>
             </div>
             <FormButton text="Save"/>
         </FormContainer>
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