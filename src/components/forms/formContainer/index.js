import React from 'react'
import {Formik,Form,Field,useFormikContext} from 'formik'
import './FormContainer.css'

export function FormInput({label="Label",name}){

    return <div className="form-input-item">
            <label>{label}</label>
            <Field name={name} placeholder={label}/>
    </div>
}

export function FormPassword({label="Label",name,changeNotify = () =>{}}){
    const formik = useFormikContext()
    const onInputChange = (evt) =>{
        formik.handleChange(evt)
        changeNotify(evt.target.value)
    }

    return formik === undefined? <span>Missing formik context</span>:
    <div className="form-input-item">
            <label>{label}</label>
            <Field type="password" name={name} onChange={onInputChange} placeholder={label}/>
    </div>
}

export function FormTextArea({label="Label", name}){
    return <div className="form-input-item">
    <label>{label}</label>
        <Field name={name} as="textarea"/>
    </div>
}

export function FormSelect({label="Label",name,options, defaultOption}){
    
    return <div className="form-input-item">
    <label>{label}</label>
    <Field name={name} as={"select"}>
        {
            !Array.isArray(options)? 
            null:
            options.map((option) => {
                return <option key={option.value} value={option.value}>{option.text}</option>
            })
        }
    </Field>
    </div>
}

export function FormButton({text="Button"}){
    return <button className="form-button-item" type="submit">
            <span>{text}</span>
    </button>
}

export default function FormContainer({title="Title", elementID, children, submitFunc = (values)=>{console.error("Missing submit function")},initValues={}}){
    return <div id={elementID} className="form-container-root">
        <Formik
            initialValues={initValues}
            onSubmit={(values) => {submitFunc(values)}}>
            <Form>    
                <div className="form-container-content">
                    <h1>{title}</h1>
                    {children}
                </div>
            </Form>
        </Formik>
    </div>
}

