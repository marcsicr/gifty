import React from 'react'

import Header from 'components/header/Header'
import TrendingSearches from 'components/trends/trendingSearches'
import TrendingsCarousel from 'components/carousels/trendingsCarousel'
import SearchForm from 'components/forms/searchForm/SearchForm'
import KeywordCarousel from 'components/carousels/keywordCarousel'

import {SPORTS_IMG, ANIMALS_IMG, MUSIC_IMG} from 'img/IMGS'

export default function Home(){

    return(
        <div id="app-wrapper">
            <Header/>
            <SearchForm/>
            <TrendingsCarousel/>
            
            <KeywordCarousel keyword={"Animals"} carouselHeight={140} titleIcon={<ANIMALS_IMG/>} />
            <KeywordCarousel keyword={"Sport"} carouselHeight={280} titleIcon={<SPORTS_IMG/>} />
            <KeywordCarousel keyword={"Music"} carouselHeight={140} titleIcon={<MUSIC_IMG/>}/>
            
            <TrendingSearches/>
        </div>
 
    ) 
}