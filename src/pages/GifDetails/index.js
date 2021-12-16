
import React, {useState,useEffect} from 'react'

import Header from 'components/header/Header'
import SearchForm from "components/forms/searchForm/SearchForm"
import { getGifById } from 'services/giphy/API'
import DetailedGif from 'components/detailedGif'

export default function GifDetails({params}){
    const {idGif} = params
    console.log(idGif)
    const [gif,setGif] = useState(null)
    useEffect(()=>{
        getGifById(idGif).then((gifData) =>{
            setGif(gifData)
            console.log(gifData)
        })
    },[idGif] )

    return <>
        <Header/>
        <SearchForm/>
        {gif !== null ? 
        <DetailedGif 
            url={gif.url} 
            title={gif.title} 
            size={gif.size} 
            width={gif.width}
            height={gif.height}
            rating={gif.rating}
            source={gif.source}
            import_datetime={gif.import_datetime}/>
        :null}

    </>
}