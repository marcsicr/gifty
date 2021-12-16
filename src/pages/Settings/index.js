import React from 'react'
import Header from 'components/header/Header'
import SearchForm from 'components/forms/searchForm/SearchForm'
import UserSettings from 'components/user/userSettings'
import { useLoggedUser } from 'hooks/user/useLoggedUser'

export default function Settings(){
    
    useLoggedUser()
    
    return<> 
    <Header/> 
    <SearchForm/>
    <UserSettings/>
    </>
}

