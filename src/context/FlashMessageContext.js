import React,{useState,useRef} from 'react'
import FlashMessage from 'components/flashMessage'

const FlashMessageContext = React.createContext({})

export function FlashMessageProvider({children}){

    const [isShowing,setIsShowing] = useState(false)
    const [message,setMessage] = useState('Lorem ipsum')
    
    const ref=useRef()
    const showClass = ' flash-message-show'

    const show = () =>{
        console.log("AHA!");
        ref.current.className = 'flash-message-container'
    }

    const showMessage = ({duration,message="Lorem ipsum", isError=false}) =>{
        setMessage(message)
        if(!isShowing){

            ref.current.className= 'flash-message-container'.concat(showClass).concat(isError? ' error-message':' ok-message')
            setTimeout(show,duration)
        }
    }
    return <FlashMessageContext.Provider value={{showMessage}}>
        <FlashMessage containerRef={ref} message={message}/>
        {children}
    </FlashMessageContext.Provider>
}

export default FlashMessageContext