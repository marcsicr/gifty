import React,{useState} from 'react'


const UserContext = React.createContext({})

export function UserContextProvider ({children}){

    const [jwt,setJWT] = useState( () => window.sessionStorage.getItem('jwt'))
    const [username,setUsername] = useState(() => window.sessionStorage.getItem('username'))
    const [userSettings,setUserSettings] = useState(() => JSON.parse(window.sessionStorage.getItem('userSettings')))

    
    return <UserContext.Provider value={{jwt,setJWT,username,setUsername,userSettings,setUserSettings}}>
        {children}
    </UserContext.Provider>
}

export default UserContext