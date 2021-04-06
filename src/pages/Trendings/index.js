import React from 'react'
import Header from 'components/header/Header'
import TrendsGifs from 'components/trendsGifs/TrendsGifs'
import SearchForm from 'components/searchForm/SearchForm'

export default function Trendings(){

    return <div id="app-wrapper">
                <Header/>
                <SearchForm/>
                <TrendsGifs/>
            </div>
    
    
}