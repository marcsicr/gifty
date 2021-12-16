import React, {useContext} from 'react'
import FormContainer, {FormSelect, FormButton} from 'components/forms/formContainer'
import FlashMessageContext from 'context/FlashMessageContext';
import GiftyContext from 'context/GiftyContext';
import Gifty from 'services/gifty/service'


export default function SearchSettingsForm ({rating = 'g'}){
    
    const {showMessage} = useContext(FlashMessageContext)
    const ctx = useContext(GiftyContext)

    const ratingOps = [
        {value:"g",text:"All public"},
        {value:"pg",text:"Acceptable"},
        {value:"pg-13",text:"Acceptable + 13"},
        {value:"r",text:"Unrestricted + 18"},
    ]
    
    const searchSettingsSubmit = (values) =>{
        const {rating} = values
        console.log('Rating submited',rating)
        Gifty.saveRatingSettings({rating},ctx).then((success) =>{
            if(success){
                showMessage({duration:4000, message:'Ratting settings saved :)'})
            }

        })
    }

  
    return <FormContainer title="Search Settings" submitFunc={searchSettingsSubmit} initValues={{rating}}>
        <FormSelect name="rating" label="Rattings" options={ratingOps} defaultOption={rating} />
        <FormButton text="Save"/>
    </FormContainer>

}