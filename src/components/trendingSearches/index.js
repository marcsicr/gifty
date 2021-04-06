import React, {useEffect, useState}from 'react'
import {useLocation} from 'wouter'

import {getTrendingSearchTerms} from 'services/giphy/API'
import LoadingDots from 'components/loadingDots'

import './trendingSearches.css'
export default function TrendingSearches(){

    
    const COLORS = ['tg','tb','tp','tr','ty']

    const [_, pushLocation] = useLocation()

    const [terms,setTerms] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        getTrendingSearchTerms().then((terms) => {
            setTerms(terms)
           
            setIsLoading(false)
        })
    },[])

    const onTermClick = (evt) =>{
        let d = encodeURI(evt.target.innerText)
        console.log(evt)
        pushLocation(`/search/${d}`)
    }

    return <section className="trendings-wrapper">
            <h2 className="trendings-title">Trending Searches</h2>
            <ul className="trendings-list">
                {
                    isLoading? <LoadingDots/>:
                    terms.map((term,index) =>{
                        return <li key={term} className={`trendings-item ${COLORS[index % COLORS.length]}`} onClick={onTermClick}>{term}</li>
                                
                    })
                }
            </ul>
            </section>
}