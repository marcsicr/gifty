import { loginService,
        updateAvatarImage,
        getAvatarImage,
        saveUserAccountSettings,
        saveUserRattingSettings,
        getUserSettings,
        updateUserPassword,
        existsUser,
        addGifToFavorites,
        removeGifFavorites,
        getGifFavorites }  from "./API";

const login = async ({user,password},ctx) =>{

    console.log("Gifty login service")
    const {setJWT,setUsername,setUserSettings} = ctx

    const {success,jwt,username,userSettings} = await loginService({username:user,password})

    if(success){
        window.sessionStorage.setItem('jwt',jwt)
        window.sessionStorage.setItem('username',username)
        window.sessionStorage.setItem('userSettings',JSON.stringify(userSettings))
        setJWT(jwt)
        setUsername(username)
        setUserSettings(userSettings)     

    }else{
        window.sessionStorage.removeItem('jwt')
        window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('userSettings')
    }
}

const logout = (ctx) => {
    console.log(ctx)
    const{setJWT} = ctx
    window.sessionStorage.removeItem('jwt')
    window.sessionStorage.removeItem('username')
    setJWT(null)
}

const uploadAvatar = async(formData,ctx) =>{
    const{jwt} = ctx
    return updateAvatarImage(jwt,formData)
}

const getAvatar = async(ctx) =>{
    const {jwt} = ctx
    return await getAvatarImage(jwt)
}

const saveAccountSettings = async({displayName,email,about},ctx) =>{
    const {jwt} = ctx
    return saveUserAccountSettings({jwt,displayName,email,about})
}

const saveRatingSettings = async({rating},ctx) =>{
    const{jwt,setUserSettings} = ctx
    const {success,settings} = await saveUserRattingSettings({jwt,rating})
    setUserSettings(settings)
    return success
}

const getSettings = async(ctx) =>{
    const{jwt} = ctx
    return getUserSettings(jwt)
}

const updatePassword  = async({currentPwd,newPwd},ctx) => {
   const {jwt} = ctx
    return updateUserPassword({jwt,currentPwd,newPwd})
}


const existsUsername = async ({username}) => {
    return existsUser({username})
}

const addToFavs =  async (idGif,ctx) => {
    const {jwt,favs,setFavs} = ctx
    if(!jwt) return
    let success =  await addGifToFavorites(idGif,jwt)
    if(success){
        favs.push(idGif)
        setFavs(favs)
        return true
    }
    return false;
}

const removeFromFavs = async (idGif,ctx) => {
    const {jwt,favs,setFavs} = ctx
    if(!jwt) return
    await removeGifFavorites(jwt,idGif)
    setFavs(favs.filter((value) => value !== idGif ))
}

   
const fetchFavorites = (ctx)=>{ 
    const {jwt,setFavs} = ctx
    getGifFavorites(jwt).then((favs) => {
        setFavs(favs)
    })
}

const service = {login,logout,uploadAvatar,getAvatar,saveAccountSettings,saveRatingSettings,getSettings,updatePassword,existsUsername,addToFavs, removeFromFavs,fetchFavorites}
export default service  