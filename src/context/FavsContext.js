import React,{useCallback,useState,useEffect} from 'react'
import {getGifFavorites,addGifToFavorites,removeGifFavorites} from 'services/gifty/API'
import {useUser} from 'hooks/useUser'

const FavsContext = React.createContext({})

export function FavsContextProvider ({children}){
    
    const [favs,setFavs] = useState([])
    
    const [isFavsLoading,setIsFavsLoading] = useState(false)

    const {jwt} = useUser()

    useEffect(() => { 
        
        if(!jwt){
            console.log("NO JWT")
            return setFavs([])
        } 

        setIsFavsLoading(true)
        getGifFavorites(jwt).then((favs) => {
            setFavs(favs)
            setIsFavsLoading(false)
            console.log("getGifFavorites Effect finished")
        })
    
      
    },[jwt,setFavs])


    const addToFavs = useCallback( async (idGif) => {
        if(!jwt) return
        let success =  await addGifToFavorites(idGif,jwt)
        if(success){

            favs.push(idGif)
            setFavs(favs)
            return true
    }
    return false;
  
    },[setFavs,favs,jwt])


    const removeFav = useCallback(async (idGif) => {
        if(!jwt) return
        setIsFavsLoading(true)
        await removeGifFavorites(jwt,idGif)
        setFavs(favs.filter((value) => value !== idGif ))
        setIsFavsLoading(false)
    },[favs,jwt,setFavs])

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

    return <FavsContext.Provider value={{favs,setFavs,isFavsLoading,addToFavs,removeFav,isGifFav}}>
        {children}
    </FavsContext.Provider>

}

export default FavsContext