import {useEffect, useState} from 'react'
import { getReleatedTerms } from 'services/giphy/API'

export function useRelatedTerms({term,maxResults}){

    const [isTermsLoading,setIsLoading] = useState(true)

    const [relatedTerms,setRelatedTerms] = useState([])

    useEffect(() =>{
        setIsLoading(true)
        getReleatedTerms(term,maxResults)
        .then((terms) => {
            setRelatedTerms(terms)
            setIsLoading(false)
        })
        
    },[term])

    return {isTermsLoading,relatedTerms}
}