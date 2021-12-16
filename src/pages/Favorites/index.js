import React, { useEffect } from 'react'

import Header from 'components/header/Header'
import SearchForm from "components/forms/searchForm/SearchForm";
import useFavoriteGifs from 'hooks/useFavoriteGifs';
import GifsGrid from 'components/gifsGrid/GifsGrid';
import LoadingDots from 'components/loaders/loadingDots';
import { useLoggedUser } from 'hooks/user/useLoggedUser';

export default function Favorites(){

    useLoggedUser()
    
    const {favGifsData,isGifsDataLoading} = useFavoriteGifs()

    useEffect(()=>{
       // debugger
       //console.log("page data:",favGifsData)
       //console.log("isGifDataLoading",isGifsDataLoading)
    },[favGifsData,isGifsDataLoading])

    return <div id="app-wrapper">
        <Header/>
        <SearchForm/>
        {isGifsDataLoading ? <LoadingDots/> :  <GifsGrid emptyMsg={"You don't have any favorites"} gifs={favGifsData} />}
      
    </div>
}