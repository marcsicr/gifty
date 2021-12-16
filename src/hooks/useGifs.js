import {useEffect, useState} from 'react'
import {getGifs} from 'services/giphy/API'


const INITIAL_PAGE = 0
export default function useGifs({keyword,rating,limit}){

    const [isLoading,setIsLoading] = useState(true)
    const [isLoadingNextPage, setLoadingNextPage] = useState(false)
    
    const [page, setPage] = useState(INITIAL_PAGE)
    const [gifs,setGifs] = useState([])
    const [resultsCount, setGifsCount] = useState(0)
    useEffect(()=>{
        getGifs({keyword,rating,limit}).then(({gifs,pagination})=>{
            setGifs(gifs)
            console.log("Total count:" + pagination.total_count)
            setGifsCount(pagination.total_count)
            setIsLoading(false);
        });
    },[keyword,rating,limit])

    useEffect( () => {
        if(page === INITIAL_PAGE) return
        setLoadingNextPage(true)

        getGifs({keyword,page,rating}).then(({gifs}) => {
            setGifs(prevGifs => prevGifs.concat(gifs))
            setLoadingNextPage(false)
        })
        
    }, [keyword,page,rating])

    return {isLoading,isLoadingNextPage,gifs,resultsCount,setPage}
}