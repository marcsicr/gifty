import React, {useEffect, useState} from 'react'
import SearchForm from 'components/forms/searchForm/SearchForm'
import Header from 'components/header/Header'

import {getRandomGif} from 'services/giphy/API'


export default function NotFound(){

    const [isLoading,setIsLoading] = useState(true)
    const [randomGif, setRandomGif] = useState()

    useEffect( () =>{

        getRandomGif({keyword:"Error 404"}).then ((gif)=> {
            setRandomGif(gif)
            setIsLoading(false)
        })
        
    },[]) 


    return <div id="app-wrapper">
            <Header/>
            <SearchForm/>
            <h2>404! NOT FOUND</h2>
            {
                isLoading? null : <img src={randomGif.url} alt=""/>
                
            }
        </div>
}