import React, {useState,useContext} from 'react'
import {PasswordStrengthBar} from 'components/forms/passwordStrengthBar'
import FormContainer, {FormPassword, FormButton} from 'components/forms/formContainer'

import FlashMessageContext from 'context/FlashMessageContext'
import GiftyContext from 'context/GiftyContext'
import Gifty from 'services/gifty/service'

export default function PasswordSettingsForm(){

    const {showMessage} = useContext(FlashMessageContext)
    const ctx  = useContext(GiftyContext)

    const[newPWDInput, setNewPWDInput] = useState("")
    const passwordSettingsSubmit = (values) => {
        
        const {currentpwd,newpwd,repeatpwd} = values

        if(currentpwd !== '' && newpwd !== '' && repeatpwd !== '' && newpwd === repeatpwd){
            
            Gifty.updatePassword({currentPwd:currentpwd,newPwd:newpwd},ctx).then(({success})=>{
                console.log(success)
                if(success){
                    showMessage({duration:4000, message:'Password updated :D',isError:false})
                }else{
                    showMessage({duration:4000, message:'Something went wrong...',isError:true})
                }
            })
        }else{
            showMessage({duration:4000, message:'Wrong values',isError:true})
        }
        console.log(values)
    }

    return <FormContainer elementID="password" title="Password Settings" submitFunc={passwordSettingsSubmit} initValues={{currentpwd:'',newpwd:'',repeatpwd:''}}>
        <FormPassword label="Current password" name="currentpwd"/>
        <FormPassword label="New password" name="newpwd" changeNotify={(value) =>{setNewPWDInput(value)}}/>
        <FormPassword label="Repeat new password" name="repeatpwd"/>
        <div className="align-left">
            <PasswordStrengthBar password={newPWDInput}/>
        </div>
        <FormButton text="Save"/>
    </FormContainer>
}