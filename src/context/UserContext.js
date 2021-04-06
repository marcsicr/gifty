import React,{useState} from 'react'


const UserContext = React.createContext({})

export function UserContextProvider ({children}){

    const [jwt,setJWT] = useState( () => window.sessionStorage.getItem('jwt'))
    const [username,setUsername] = useState(() => window.sessionStorage.getItem('username'))

    
    return <UserContext.Provider value={{jwt,setJWT,username,setUsername}}>
        {children}
    </UserContext.Provider>
}

export default UserContext