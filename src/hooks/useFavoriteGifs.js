
import GiftyContext from 'context/GiftyContext'
import {useContext, useEffect, useState} from 'react'
import {getGifsById} from 'services/giphy/API'


export default function useFavoriteGifs(){
   
    const [isGifsDataLoading,setIsLoading] = useState(true)
    const [favGifsData,setFavoriteGifsData] = useState([])
    const {favs,isFavsLoading} = useContext(GiftyContext)

    useEffect(()=>{

        if(isFavsLoading) return
        if(favs === 'undefined') return
        
        if(favs.length > 0){
            setIsLoading(true)
            getGifsById(favs).then((gifs) =>{
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