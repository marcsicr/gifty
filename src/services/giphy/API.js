import {API_KEY,API_URL} from './giphyAPISettings'

function fromApiToGifs(apiResponse){

    const {data = []} = apiResponse
    

    if (Array.isArray(data)) {
        const gifs = data.map(image => {
          const {images, title, id} = image
          const { url } = images.downsized
          
          const {display_name,avatar_url} = image.hasOwnProperty('user')? image.user : {display_name:'',avatar_url:''}

          return { title, id, url,username:display_name,user_avatar:avatar_url }
        })
        return gifs
      }
      return []
}

function fromApiToSearchResults(apiResponse){
    
    const {data = []} = apiResponse
    const {pagination} = apiResponse

    let gifs = []
    if (Array.isArray(data)) {
          gifs = data.map(image => {
          const {images, title, id} = image
          const { url } = images.downsized
          
          const {display_name,avatar_url} = image.hasOwnProperty('user')? image.user : {display_name:'',avatar_url:''}

          return { title, id, url,username:display_name,user_avatar:avatar_url }
        })    
    }
      return {gifs,pagination}

   
}

export async function getTrendingGifs({
    limit = 15,
    rating = "g",
    page = 0
} = {}){

    const dataURL = `${API_URL}/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${page * limit}&rating=${rating}`
    return fetch(dataURL)
    .then(res => res.json()).then(fromApiToGifs)
}

export async function getGifs({
    limit = 15,
    rating = "g",
    keyword = "morty",
    page = 0,
} = {}){

    const apiURL = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${page * limit}&rating=${rating}&lang=en`

    return fetch(apiURL)
    .then(res=> res.json())
    .then(fromApiToSearchResults)
}

export async function getTrendingSearchTerms(){

    const dataURL = `${API_URL}/trending/searches?api_key=${API_KEY}`
    return fetch(dataURL)
    .then((res) => res.json()).then((apiResponse) => {
        const {data = []} = apiResponse
        return data
    })
    
}

export async function getRandomGif({
    rating = "g",
    keyword= "random"
} = {}){

    const dataURL = `${API_URL}/gifs/random?api_key=${API_KEY}&tag=${keyword}&rating=${rating}`
    return fetch(dataURL)
    .then(res => res.json()).then((response) => {

      
        const {images, title, id} = response.data
        const { url } = images.downsized_medium
       
        
        const {display_name,avatar_url} = response.hasOwnProperty('user')? response.user : {display_name:'',avatar_url:''}

        return { title, id, url,username:display_name,user_avatar:avatar_url }
    })
}

export async function getGifById(idGif){

    const dataURL = `${API_URL}/gifs/${idGif}?api_key=${API_KEY}`
    return fetch(dataURL)
    .then(res => res.json()).then((response) => {

        console.log(response)
        const {images, title, id,source,rating,import_datetime} = response.data
        const { url,width,height,size } = images.downsized_medium
           
        const {display_name,avatar_url} = response.hasOwnProperty('user')? response.user : {display_name:'',avatar_url:''}

        return { title, id, url,username:display_name,user_avatar:avatar_url,source,rating,import_datetime, width,height,size }
    })
}

export async function getGifsById(idsArray){
    if(!Array.isArray(idsArray))
        return

    const gifsToGet = idsArray.join()

    const dataURL = `${API_URL}/gifs?api_key=${API_KEY}&ids=${gifsToGet}`
    return fetch(dataURL)
    .then(res => res.json())
    .then((fromApiToGifs))

}

export async function getReleatedTerms(keyword,maxResults){

    const dataURL = `${API_URL}/tags/related/${keyword}?api_key=${API_KEY}`

    return(fetch(dataURL))
    .then(res => res.json())
    .then((response) => {
        const {data = []} = response
        return data.map((obj) => obj.name).slice(0,maxResults)
    })


}

