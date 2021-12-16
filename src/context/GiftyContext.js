import React, {useEffect,useState,useCallback} from 'react'
import Gifty from 'services/gifty/service'
const GiftyContext = React.createContext({})

export function GiftyContextProvider({children}){


    const [jwt,setJWT] = useState( () => window.sessionStorage.getItem('jwt'))
    const [username,setUsername] = useState(() => window.sessionStorage.getItem('username'))
    const [userSettings,setUserSettings] = useState(() => JSON.parse(window.sessionStorage.getItem('userSettings')))
    const [favs,setFavs] = useState([])

    useEffect(()=>{
        if(!jwt) return
        Gifty.fetchFavorites({jwt,setFavs})
    },[jwt])

    const isGifFav = useCallback((idGif) =>{    
        if(!jwt) return false;

        if(favs === undefined)
            return false

        if(Array.isArray(favs)) {
            let index = favs.indexOf(idGif)
            return index >=0
        } 
        return false
     
    },[favs,jwt])

    //-----------
    return <GiftyContext.Provider value={{
        jwt,
        isLogged:Boolean(jwt),
        username,
        userSettings,
        favs,
        setJWT,
        setFavs,
        setUsername,
        setUserSettings,
        isGifFav,
    }}>
        {children}
    </GiftyContext.Provider>
}

export default GiftyContext