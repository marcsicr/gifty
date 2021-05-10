import React, {useContext} from 'react'
import FormContainer, {FormSelect, FormButton} from 'components/forms/formContainer'
import FlashMessageContext from 'context/FlashMessageContext';
import GiftyContext from 'context/GiftyContext';


export default function SearchSettingsForm ({ratting = 'g'}){
    
    const {showMessage} = useContext(FlashMessageContext)
    const {saveRattingSettings} = useContext(GiftyContext)

    const ratingOps = [
        {value:"g",text:"All public"},
        {value:"pg",text:"Acceptable"},
        {value:"pg-13",text:"Acceptable + 13"},
        {value:"r",text:"Unrestricted + 18"},
    ]
    
    const searchSettingsSubmit = (values) =>{
        const {ratting} = values
        saveRattingSettings({ratting}).then(({success}) =>{
            if(success){
                showMessage({duration:4000, message:'Ratting settings saved :)'})
            }
        })
    }

  
    return <FormContainer title="Search Settings" submitFunc={searchSettingsSubmit} initValues={{ratting:ratting}}>
        <FormSelect name="ratting" label="Rattings" options={ratingOps} defaultOption={ratting} />
        <FormButton text="Save"/>
    </FormContainer>

}