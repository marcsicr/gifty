import {useUser} from 'hooks/user/useUser'
import { useEffect } from 'react'
import {useLocation} from 'wouter'

export function useLoggedUser(){

    const {isLogged,jwt} = useUser()
    const [_,pushLocation] = useLocation()

    useEffect(() =>{
        if(!isLogged) pushLocation('/login')
    },[isLogged,pushLocation])
   
    return {jwt}
}