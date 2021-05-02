import React,{useState,useRef, useContext} from 'react'
import {useFormik} from 'formik'
import './FormContainer.css'

const FormikContext = React.createContext()

export function FormInput({label="Label",name}){

    const formik = useContext(FormikContext)

    return formik === undefined? <span>Missing formik context</span>:
    <div className="form-input-item">
            <label>{label}</label>
            <input type="text" id={name} name={name} placeholder={label} value={formik.values[name]} onChange={formik.handleChange}></input>
    </div>
}

export function FormPassword({label="Label",name,changeNotify = () =>{}}){
    const formik = useContext(FormikContext)

    const onInputChange = (evt) =>{
        formik.handleChange(evt)
        changeNotify(evt.target.value)
    }

    return formik === undefined? <span>Missing formik context</span>:
    <div className="form-input-item">
            <label>{label}</label>
            <input type="password" id={name} name={name} placeholder={label} value={formik.values[name]} onChange={onInputChange}></input>
    </div>
}

export function FormTextArea({label="Label", name}){

    const formik = useContext(FormikContext)

    return formik === undefined? <span>Missing formik context</span>:
    <div className="form-input-item">
    <label>{label}</label>
        <textarea id={name} name={name} className="form-textarea-item" placeholder={label} value={formik.values[name]} onChange={formik.handleChange}></textarea>
    </div>
}

export function FormSelect({label="Label",name,options, defaultOption}){
    
    const formik = useContext(FormikContext)
    return <div className="form-input-item">
    <label>{label}</label>
    <select id={name} name={name} defaultValue={defaultOption} onChange={formik.handleChange}>
        {
            !Array.isArray(options)? 
            null:
            options.map((option) => {
                return <option key={option.value} value={option.value}>{option.text}</option>
            })
        }
    </select>
    </div>
}

export function FormButton({text="Button"}){
    return <button className="form-button-item" type="submit">
            <span>{text}</span>
    </button>
}

export default function FormContainer({title="Title", elementID, children, submitFunc = (values)=>{console.error("Missing submit function")},initValues={}}){
    
    const formik = useFormik({
        initialValues: initValues,
        onSubmit: values => {submitFunc(values)}
    })

    const formRef = useRef(null)
    return <div id={elementID} className="form-container-root">
        <form ref={formRef} onSubmit={formik.handleSubmit}>
            <FormikContext.Provider value={formik}>
                <div className="form-container-content">
                    <h1>{title}</h1>
                    {children}
                </div>
            </FormikContext.Provider>
        </form>
    </div>
}

