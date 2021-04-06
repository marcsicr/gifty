import { useRelatedTerms } from 'hooks/useRelatedTerms'
import {Link} from 'wouter'
import React, { useEffect } from 'react'

import './relatedSearchTerms.css'
export default function RelatedSearchTerms({term,maxResults = 4}){

    const {isTermsLoading,relatedTerms} = useRelatedTerms({term,maxResults})

    return <div className="related-search-terms">
        <h3>Related terms</h3>
        {isTermsLoading? null:<TermsList terms={relatedTerms}/>}
        </div>
}


function TermsList({terms}){

    console.log(terms)
    return <ul className="rt-list">
        {
            terms.map((term) => {
                return <SearchTerm key={term} name={term}/>
            })
        }
    </ul>
}

function SearchTerm({name}){
    return <li className="rt-item"><Link href={`/search/${name}`}>#{name}</Link></li>
}