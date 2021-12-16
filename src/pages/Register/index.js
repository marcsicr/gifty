import AnimatedBackground from 'components/animatedBackground'
import RegisterForm from 'components/forms/registerForm'
import React from 'react'

import './register.css'

export default function Register(){

    return <div className="app-wrapper">
        <div className="register-form-wrapper">
            <RegisterForm/>
            <AnimatedBackground urlSource="https://media.giphy.com/login-join-backgrounds/science-lab.mp4"/>
        </div>
       
    </div>
    
   
}