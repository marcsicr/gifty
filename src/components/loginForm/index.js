import React,{useEffect, useState} from 'react'
import {Link,useLocation} from 'wouter'
import {useUser} from 'hooks/useUser'
import './loginForm.css'

export default function LoginForm(){

    const [formUser,setUsername] = useState('')
    const [formPwd,setPwd] = useState('')

    const[_,pushLocation] = useLocation()

    const  {isLogged,login /*,isLoginLoading,loading,logout*/} = useUser()

    useEffect( () =>{
        if(isLogged){
            pushLocation('/')
        }
    },[isLogged,pushLocation])

    const handleSubmit = (evt) =>{

        evt.preventDefault();
        login({user:formUser,password:formPwd})

    }
    
    return (
        <div className="form-container">
            <form method="post" onSubmit={handleSubmit} className="form-area login-form">
                <div className="form-wrapper">
                    <h2>Welcome back to Gifty!</h2>
                        <input 
                        type="text" 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Username"
                            className="login-input"/>

                        <input 
                            type="password" 
                            onChange={(e) => setPwd(e.target.value)} 
                            placeholder="Password"
                            className="login-input"/>
                
                        <button className="btn-form">Log in</button>

                        <Link href="/register" className="link-register">Join Gifty!</Link>
                </div>
            </form>
        </div>
        
        )
}
