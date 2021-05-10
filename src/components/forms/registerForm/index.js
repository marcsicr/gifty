import React, {useContext, useState} from 'react'
import {useFormik} from 'formik'
import {registerService} from 'services/gifty/API'

import { PasswordStrengthBar } from 'components/passwordStrengthBar';

import './registerForm.css'
import GiftyContext from 'context/GiftyContext';

export default function RegisterForm(){

    const [errorMsg,setErrorMsg] = useState('')
    const {existsUser} = useContext(GiftyContext)

    const validate = async (values) =>{

        const errors = {};
        if(!values.username){
            errors.username="Required"
        }else if(values.username.length > 10 || values.username.length < 4){
            errors.username="Username must be between 4 and 10 characters"
        } else{
            
            const {exists} = await existsUser({'username':values.username})
            
            if(exists){
                 errors.username="This username is not available"
            }
        }
           
        
        if(!values.password1)
            errors.password1="Required"
        
        if(!values.password2)
            errors.password2="Required"
        
        if(values.password1 && values.password2){
            if(values.password1 !== values.password2){
                errors.different="Passwords are different"
            }   
        }

        return errors;
    }

    const formik = useFormik({
        initialValues:{
            username: '',
            password1: '',
            password2: '',
        },
        validateOnChange:false,
        validate,
        onSubmit : async (values) => {

            const {username,password1} = values
           
            let result = await registerService({username,password:password1})
            const {error,errorMsg} = result

            if(error){
                setErrorMsg(errorMsg)
            }
        }
    })
    return <div>
            <form onSubmit={formik.handleSubmit} className="form-area register-form">
                <h2>Account details</h2>
                {errorMsg !== ''? <h3>{errorMsg}</h3>:null}
                <input 
                    type="text"
                    id="username"
                    name="username"
                    required="true"
                    placeholder="Username"
                    className="register-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    />
                {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div>:null}
                <input 
                    type="password"
                    id="password1"
                    name="password1"
                    required="true"
                    placeholder="Password"
                    className="register-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password1}
                    />
                    <PasswordStrengthBar password={formik.values.password1}/>
                 {formik.touched.password1 && formik.errors.password1 ? <div>{formik.errors.password1}</div>:null}
                <input 
                    type="password"
                    id="password2"
                    name="password2"
                    required="true"
                    placeholder="Repeat password"
                    className="register-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password2}
                    />
                 {formik.touched.password2 && formik.errors.password2 ? <div>{formik.errors.password2}</div>:null}               
                {formik.touched.password1 && formik.touched.password2 && formik.errors.different && !formik.errors.password1 ? <div>{formik.errors.different}</div>:null}
                <button className="btn-form" type="submit">Sign up</button>
            </form>
    </div>
}