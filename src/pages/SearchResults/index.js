import React, { useEffect,useRef,useCallback } from "react";

import debounce from 'just-debounce-it'

import useGifs from "hooks/useGifs";
import SearchForm from "components/searchForm/SearchForm";
import Header from "components/header/Header";
import GifsGrid from "components/gifsGrid/GifsGrid";
import LoadingDots from "components/loaders/loadingDots";
import useNearScreen from "hooks/useNearScreen";
import RelatedSearchTerms from "components/relatedSearchTerms";

import './searchResults.css'

export default function SearchResults({ params }) {
  const { keyword, rating = "g" } = params;
  const {isLoading,isLoadingNextPage,gifs,resultsCount,setPage} = useGifs({ keyword, rating});

  

  const externalRef = useRef()
  const {isNearScreen} = useNearScreen({
    externalRef: isLoading ? null : externalRef,
    distance:'50px',
    once:false
  })


  const debounceHandleNextPage = useCallback(debounce (
    () => setPage(prevPage => prevPage +1),200
  ),[setPage])

  useEffect( () => {
    if(isNearScreen) debounceHandleNextPage()
  }, [debounceHandleNextPage,isNearScreen])


  return (
    <div className="search-results">
      <Header />
      <SearchForm />
      {isLoading? null : 
      <div className="search-meta-info">
        <span>{`${decodeURI(keyword)} ${resultsCount} GIFs`}</span>
        <RelatedSearchTerms term={keyword}/>
      </div>
      }
      {isLoading ? <LoadingDots/> : <GifsGrid gifs={gifs} />}
      <div id="end-flag" ref={externalRef}></div>
      {isLoadingNextPage ? <LoadingDots/> : null}
    </div>
  );
}
