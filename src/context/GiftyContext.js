import React, {useContext} from 'react'
import  {
    getAvatarImage,
    updateAvatarImage,
    updateUserPassword,
    saveUserAccountSettings,
    saveUserRattingSettings,
    getUserSettings,
    existsUser
} from 'services/gifty/API'
import {useLocation} from 'wouter'
import UserContext from './UserContext'

const GiftyContext = React.createContext({})

export function GiftyContextProvider({children}){

    const {jwt} = useContext(UserContext)
    const [_,pushLocation] = useLocation()

    
    const validateSession = () =>{
        if(!jwt)
        pushLocation('/login')
    }

    const getAvatar = async() =>{
        validateSession()
        return await getAvatarImage(jwt)
    }

    const uploadAvatar = async(formData) =>{
        validateSession()
        return updateAvatarImage(jwt,formData)
    }

    const updatePassword  = async({currentPwd,newPwd}) => {
        validateSession()
        return updateUserPassword({jwt,currentPwd,newPwd})
    }
    
    const saveRattingSettings = async({ratting}) =>{
        validateSession()
        return saveUserRattingSettings({jwt,ratting})
    }

    const saveAccountSettings = async({displayName,email,about}) =>{
        validateSession()
        return saveUserAccountSettings({jwt,displayName,email,about})
    }

    const getSettings = async() =>{
        validateSession()
        return getUserSettings(jwt)
    }

   

   
    //1.login
    //2.register
    //3.existsUser -
    //4.addGifToFavs *
    //5.removeGifFromFavs *
    //6.getGifFavorites *
    //7.getAvatarImage * -
    //8.updateAvatarImage * -
    //9.getSettings * -
    //10.saveAccountSettings * - 
    //11.saveRattingsSettings * -
    //12.updatePassword * -


    return <GiftyContext.Provider value={{
        isLogged:Boolean(jwt),
        getAvatar,
        uploadAvatar,
        updatePassword,
        getSettings,
        saveAccountSettings,
        saveRattingSettings,
        existsUser
    }}>
        {children}
    </GiftyContext.Provider>
}

export default GiftyContext