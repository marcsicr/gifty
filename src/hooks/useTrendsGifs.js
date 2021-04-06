import {useEffect, useState} from 'react'
import {getTrendingGifs} from 'services/giphy/API'

const INITIAL_PAGE = 0
export default function useTrendsGifs({rating = 'g',limit=15}){

    const [isLoading,setIsLoading] = useState(true)
    const [isLoadingNextPage, setLoadingNextPage] = useState(false)
    
    const [page,setPage] = useState(INITIAL_PAGE)
    const [gifs,setGifs] = useState([])

    useEffect(()=>{
        getTrendingGifs({rating,limit}).then((gifs)=>{
            setGifs(gifs)
            setIsLoading(false);
        });
    },[rating,limit])

    useEffect(()=>{
        if(page === INITIAL_PAGE) return
        
        setLoadingNextPage(true)
        getTrendingGifs({rating,limit,page}).then((nextGifs)=>{
            setGifs(prevGifs => prevGifs.concat(nextGifs))
            setLoadingNextPage(false)
        });
    },[page,rating,limit])

    return {isLoading,gifs,isLoadingNextPage,setPage}
}