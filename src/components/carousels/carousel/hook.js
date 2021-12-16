import {useState,useRef, useEffect} from 'react'
export default function useController(){

    const scrollableRef = useRef()
    const nextRef = useRef()
    const previousRef = useRef()

    

    const [showPrevious,setShowPrevious] = useState(false)
    const [showNext,setShowNext] = useState(true)

  
    useEffect( () =>{
       if(showPrevious) {
           previousRef.current.classList.remove('init-hidden')
           previousRef.current.classList.remove('fadeItem')
        } else{
            previousRef.current.classList.add('fadeItem')
        }    
    },[showPrevious])

    useEffect(() =>{
        if(showNext) {
            nextRef.current.classList.remove('fadeItem')
         } else{
             nextRef.current.classList.add('fadeItem')
         }
    },[showNext])


    const nextScroll = () =>{
        let el = scrollableRef.current;
        el.scrollBy(el.offsetWidth,0)

        console.log("ScrollerWidth:" + el.offsetWidth + "ScrollX: " +el.scrollLeft  + "TotalWidth:" + el.scrollWidth);

        if( 2*el.offsetWidth + el.scrollLeft >= el.scrollWidth){
            console.log("Hide next arrow")
            setShowNext(false)
        }

        setShowPrevious(true)
    }
    
    const previousScroll = () =>{

        let el = scrollableRef.current;
        let currentScrollX = el.scrollLeft;
        el.scrollBy(-el.offsetWidth,0)
    
        if( currentScrollX <= el.offsetWidth){
            console.log("Hide previous arrow")
            setShowPrevious(false)
        }    
        setShowNext(true) 
    }

    return {previousRef, nextRef, scrollableRef,previousScroll,nextScroll}
}