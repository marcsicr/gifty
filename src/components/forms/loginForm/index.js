import React,{useContext,useState} from 'react'
import {Link,Redirect} from 'wouter'
import './loginForm.css'
import GiftyContext from 'context/GiftyContext'
import Gifty from 'services/gifty/service'

export default function LoginForm(){

    const [formUser,setUsername] = useState('')
    const [formPwd,setPwd] = useState('')
    const [isErrorLogin,setIsErrorLogin] = useState(false)

    const  ctx = useContext(GiftyContext)
    const  {isLogged} = ctx

    const handleSubmit = async (evt) =>{
        evt.preventDefault();
        const success = await Gifty.login({user:formUser,password:formPwd},ctx)
        if(!success)
            setIsErrorLogin(true)
    }
    
    return isLogged? <Redirect to={"/"}/>:
    <div className="form-container">
            <form method="post" onSubmit={handleSubmit} className="form-area login-form">
                <div className="form-wrapper">
                    <h2>Welcome back to Gifty!</h2>
                    {isErrorLogin?<h3 className="invalid-login">Invalid login</h3>: null}
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
    
        
}
