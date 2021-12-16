import GiftyContext from 'context/GiftyContext'
import { useContext, useEffect } from 'react'
import {useLocation} from 'wouter'

export function useLoggedUser(){

    const {isLogged} = useContext(GiftyContext)

    // eslint-disable-next-line no-unused-vars
    const [_,pushLocation] = useLocation()

    useEffect(() =>{
        if(!isLogged) pushLocation('/login')
    },[isLogged,pushLocation])
   
    return {isLogged}
}