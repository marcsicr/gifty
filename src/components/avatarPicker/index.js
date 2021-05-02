import {useRef,useContext,useState,useEffect} from 'react'
import {updateAvatarImage,getAvatarImage} from 'services/gifty/API'
import {useLoggedUser} from 'hooks/user/useLoggedUser'
import UserContext from 'context/UserContext'
import './avatarPicker.css'
import LoadingSpinner from 'components/loaders/loadingSpinner'
export default function AvatarPicker(){

    useLoggedUser()
    
    const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // in bytes

    const {jwt} = useContext(UserContext)
    const [uploading,setUploading] = useState(false)
    const inputFileRef = useRef(null)
    const formRef = useRef(null)
    const avatarRef = useRef(null)

    
    const onFileInputChange = (evt) =>{        
        evt.preventDefault()

        const file = evt.target.files[0]
        console.log(file.type)
        if(!file.type.startsWith("image")){
            console.error("This is not an image file")
            return;
        }
        if(file.size > MAX_IMAGE_SIZE){
            console.error("This is file is to big")
            return;
        }

        uploadFile(file)
    }
    
    const onChangeAvatarClick = (evt) =>{
        evt.preventDefault()
        inputFileRef.current.click()
    }

    const  getUserAvatarImage = async () =>{
       
       let url;
       const {success,blob} = await getAvatarImage(jwt)
       if(success){
        url = URL.createObjectURL(blob)
       }else{
        url = 'https://media.giphy.com/avatars/default5.gif'
       }

       avatarRef.current.src = url
    }

    const delay = (t,v) =>{
        return new Promise((resolve) =>{
            setTimeout(resolve.bind(null,v),t)
        })
    } 
    const uploadFile=(imageFile) => {
        let formData = new FormData()
        formData.append("avatar",imageFile)
        setUploading(true)


        updateAvatarImage(jwt,formData).then( (result) => {
           
            console.log("File uploaded")
            delay(500).then(() =>{
                getUserAvatarImage()
                setUploading(false)
            })
        })
    }

    useEffect(()=> {
        getUserAvatarImage()
    },[])

    

    //https://stackoverflow.com/questions/50248329/fetch-image-from-api
    
    return <form ref={formRef}>
        <div className="avatar-picker-container">
                <div className="avatar-image-container">
                    <img className="avatar-image"ref={avatarRef} src="https://media.giphy.com/avatars/default5.gif" alt="User avatar"/>
                    {uploading? <div className="loading-avatar">
                        <LoadingSpinner/>
                    </div> : null
                    }
                </div>
                
                <div>
                   <button className="change-avatar-btn" onClick={onChangeAvatarClick}>Change avatar</button>
                    <input ref={inputFileRef} type="file" className="avatar-input-file" accept="image/jpeg,image/png" onChange={onFileInputChange} />
                </div>
        </div>
    </form>
}