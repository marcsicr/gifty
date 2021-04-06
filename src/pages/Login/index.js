import React from 'react'
import LoginForm from 'components/loginForm'
import AnimatedBackground from 'components/animatedBackground'


import "./login.css"

export default function LoginPage(){

    return( 
        <div id="app-wrapper">
          <div className="login-wrapper">
          <LoginForm/>
          <AnimatedBackground urlSource="https://media.giphy.com/login-join-backgrounds/sexy-dino.mp4"/>
          </div>
        </div>
    )
}
