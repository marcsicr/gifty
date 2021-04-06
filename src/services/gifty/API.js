import {GIFTY_API_URL} from './giftyAPISettings'

export async function loginService({username,password}){
 
    const response = await fetch(GIFTY_API_URL + "/user/login",{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type': 'application/json'},
        body:JSON.stringify({username,pwd:password})
    })
    .catch((error) => {
        console.error("login service fetch failed: " +error.message)
        return{success:false,jwt:'',username:''}
    })

    if(response.ok){
        const parsedResponse = await response.json()
        const {error,errorMsg,data} = parsedResponse

        if(error){
            console.log(errorMsg)
        }

        const {username,jwt} = data
        return {success:!error,username,jwt}

    }else{
        return{success:false,jwt:'',username:''}
    }
 }

 export async function registerService({username,password}){

    const response = await fetch(GIFTY_API_URL + "/user/register",{
    method:'POST',
    mode:'cors',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({username,password})
    })
    .catch(
        error => {
        console.error("register service failed" + error.message)
        return {success:false}
    })

    if(response.ok){
        const data = await response.json()
        const {error,errorMsg} = data
        return {error,errorMsg}
        
    }else{  
        return{success:false}     
    }
}

export async function existsUser({username}){

    const response = await fetch(GIFTY_API_URL + `/user/exists/${username}`,{method:'HEAD'})
        .catch(
            error => {
            console.error("register service failed" + error.message)
            return {error:false}
        })
    
        if(response.ok){
            return{exists:true}
            
        }else{  
            return{exists:false}     
        }
}

export async function addGifToFavorites(idGif,jwt){

    const response = await fetch(GIFTY_API_URL + `/user/favorites/${idGif}`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
        },
        body:JSON.stringify({'idGif':idGif})
        })
        .catch(
            error => {
            console.error("adding gif to favorites service failed" + error.message)
            return false
        })
    
    
    if(response.ok || response.status === 201 ){

       return true;
    }

    return false;
}

export async function removeGifFavorites(jwt,idGif){

    const response = await fetch(GIFTY_API_URL + `/user/favorites/${idGif}`,
    {
        method:"DELETE", 
        headers:{'Authorization': `Bearer ${jwt}`}
    }).catch(
        error => {
        console.error("register service failed" + error.message)
        return false;
    })

    if(response.ok){
        return true;
    }

    return false;
}

export async function getGifFavorites(jwt){

    const response = await fetch(GIFTY_API_URL + "/user/favorites",
    {
        method:"GET", 
        headers:{'Authorization': `Bearer ${jwt}`}
    }).catch(
        error => {
        console.error("register service failed" + error.message)
        return []
    })

    if(response.ok){
        const parsedResponse = await response.json()
        const {gifs} = parsedResponse.data
        return gifs
    }

    return []
}