import React, {useEffect, useState,useRef} from 'react'

import './strengthbar.css'

export function PasswordStrengthBar({password}){

    
    const firstLine = useRef()
    const secondLine = useRef()
    const thirdLine = useRef()
    const fourthLine = useRef()

    const [level,setLevel] = useState(-1)

    

    //Level 0 less than 6 characters
    //Level 1: 6 characters or more but only lowercase / uppercase / number
    //Level 2 6 characters or more with one character being (UPPERCASE, NUMBER,SYMBOL)
    //Level 3 6 characters or more with two characters being (UPPERCASE, NUMBER,SYMBOL) and different group (ex: 1 UPPERCASE & 1 NUMBER)
    //Level 4 6 characters or more with at least one of each (UPPERCASE,NUMBER,SYMBOL)
    const securityLevel = (password) =>{


        if(password.length < 6){
            return -1;
        }


        var strength = -1; 
        
        if (password.match(/[a-z]+/)) {
            strength += 1;
        }

        if (password.match(/[A-Z]+/)) {
            strength += 1;
        }
    
        if (password.match(/[0-9]+/)) {
            strength += 1;
        }
  
        let hasSymbols = password.replace(/([0-9])|([A-Z])|([a-z])/g,"").length > 0
        if (hasSymbols) {
            strength += 1;
        }

        return strength;

    }

    useEffect( () =>{
        
        let strength = securityLevel(password)
        setLevel(strength)
        //console.log(password +" " +strength);

    },[password])

    useEffect( () =>{

        const lines = [firstLine,secondLine,thirdLine,fourthLine]
        if(level < 0){
            lines.forEach((line) => {
                line.current.className=""
            })
            return
        }

        const levels = ['level0','level1','level2','level3']

        let currentLevelClass = levels[level]
         //Update Security Level Bar
         for(let i =0; i < lines.length; i++){
        
            let current = lines[i].current

            if(level >= i){
                current.classList.add(currentLevelClass)
            }else{
               current.className=""
            }
        }
       
    },[level])
 

    
    return <div className="password-strength-bar">
        <span ref={firstLine}></span>
        <span ref={secondLine}></span>
        <span ref={thirdLine}></span>
        <span ref={fourthLine}></span>
    </div>
}