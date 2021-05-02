import {useCallback,useState,useContext} from 'react'
import {loginService,addGifToFavorites} from 'services/gifty/API'


import UserContext from 'context/UserContext'

export function useUser(){

    const{jwt,setJWT,username,setUsername,setUserSettings} = useContext(UserContext)
    
    const[state,setState] = useState({loading:false,error:false})


    const login = useCallback( async function ({user,password}) {
        
        setState({loading:true,error:false})
        const {success,jwt,username,userSettings} = await loginService({username:user,password})
        setState({loading:false,error:false})

        if(success){
            window.sessionStorage.setItem('jwt',jwt)
            window.sessionStorage.setItem('username',username)
            window.sessionStorage.setItem('userSettings',JSON.stringify(userSettings))
            setJWT(jwt)
            setUsername(username)
            setUserSettings(userSettings)
        }else{
            window.sessionStorage.removeItem('jwt')
            window.sessionStorage.removeItem('username')
            window.sessionStorage.removeItem('userSettings')
            setState({loading:false,error:true})
        }

    },[setJWT,setUsername])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        window.sessionStorage.removeItem('username')
        setJWT(null)
    },[setJWT])

    const addToFavs = useCallback( async (idGif) => {
        return await addGifToFavorites(idGif,jwt);
    },[jwt])

    return {
        isLogged:Boolean(jwt),
        isLoginLoading:state.loading,
        hasLoginError:state.error,
        username,
        jwt,
        login,
        logout,
        addToFavs
    }
}