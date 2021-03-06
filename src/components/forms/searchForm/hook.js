import GiftyContext from 'context/GiftyContext'
import {useReducer,useContext} from 'react'
import { useEffect } from 'react/cjs/react.development'


const ACTIONS = {
    CHANGE_KEYWORD: "change_keyword",
    CHANGE_RATING: "change_rating"
}


export const RATINGS = ['g','pg','pg-13','r']

const ACTIONS_REDUCERS = {
    [ACTIONS.CHANGE_KEYWORD]: (state,action) => ({
        ...state,
        keyword:action.payload
    }),
    [ACTIONS.CHANGE_RATING]:(state,action) => ({
        ...state,
        rating: action.payload
    })
}

const reducer = (state,action) =>{
    const actionReducer = ACTIONS_REDUCERS[action.type]
    return actionReducer ? actionReducer(state,action) : state
}

export default function useSearchForm({
initialKeyword = "",
} = {}){

    const {userSettings} = useContext(GiftyContext)
    const initialRating = userSettings? userSettings.rating : RATINGS[0]
    const [{keyword,rating},dispatch] = useReducer(reducer,{keyword:decodeURI(initialKeyword),rating:initialRating})

    useEffect(() =>{
        if(userSettings)
            dispatch({type:ACTIONS.CHANGE_RATING,payload:userSettings.rating})
    },[userSettings])
    
    return {
       changeKeyword:({keyword}) => dispatch({type:ACTIONS.CHANGE_KEYWORD, payload:keyword}),
       changeRating:({rating}) => dispatch({type:ACTIONS.CHANGE_RATING,payload:rating}),
       keyword,
       rating
    }
}