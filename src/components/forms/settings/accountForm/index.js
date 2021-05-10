import React, {useContext} from 'react'
import FormContainer, {FormInput, FormTextArea, FormButton} from 'components/forms/formContainer'
import FlashMessageContext from 'context/FlashMessageContext'
import GiftyContext from 'context/GiftyContext'

export default function AccountSettingsForm({displayName,email,about}){
    
    const {saveAccountSettings} = useContext(GiftyContext)
    const {showMessage} = useContext(FlashMessageContext)
    

    const accountSettingsSubmit = (values)=> {
        console.log(values)
        const {displayName,email,about} = values

        saveAccountSettings({displayName,email,about}).then(() =>{
            showMessage({duration:4000, message:'Account settings saved :D'})
        })
       
    }

    return <FormContainer elementID="account" title="Account Settings" submitFunc={accountSettingsSubmit} initValues={{email:email,displayName:displayName,about:about}}>
    <FormInput label="Display name" 
               name="displayName" 
               initialValue={displayName} 
   />
    <FormInput label="Email Address" name="email" initialValue={email}/>
    <FormTextArea label="About" name="about" initialValue={about}/>
    <FormButton text="Save"/>    
</FormContainer>
}
