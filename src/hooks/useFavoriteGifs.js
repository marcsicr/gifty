import FavsContext from 'context/FavsContext'
import {useUser} from 'hooks/useUser'
import {useContext, useEffect, useState} from 'react'
import {getGifsById} from 'services/giphy/API'

import {useLocation} from 'wouter'


export default function useFavoriteGifs(){

    const [_,pushLocation] = useLocation()
    const {isLogged} = useUser()

    const [isGifsDataLoading,setIsLoading] = useState(true)
    const [favGifsData,setFavoriteGifsData] = useState([])
    const {favs,isFavsLoading} = useContext(FavsContext)

    useEffect(()=>{

        if(!isLogged) pushLocation("/login")
        if(isFavsLoading) return
        if(favs === 'undefined') return
        
        if(favs.length > 0){
            setIsLoading(true)
            getGifsById(favs).then((gifs) =>{
                console.log("request returned:",gifs)
                setFavoriteGifsData(gifs)
                setIsLoading(false)
            })
        }else{
            setIsLoading(false)
            setFavoriteGifsData([])
        }

    },[favs,isFavsLoading])

    return {favGifsData,isGifsDataLoading}
}