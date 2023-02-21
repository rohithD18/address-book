import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { saveAllAddressDetails, validateForm } from '../../AddressBookServices'
import { IAddressDetails } from '../../Interfaces';
import { initialState } from '../contactsPage/ContactsPage';

interface IProps {
    show : boolean,
    closeModal : () => void,
    individualAddress : IAddressDetails,  
    isInitialState : boolean, 
    allContacts : IAddressDetails[]
}

const InputFormPage:React.FC<IProps> = (props) => {   
// console.log("propsindividualAddress", props.individualAddress);
useEffect(() => {
    props.isInitialState ?  setInputValues(initialState) : setInputValues(props.individualAddress);
},[props.individualAddress , props.isInitialState])

 const [inputValues, setInputValues] = useState<IAddressDetails>(initialState);
    // console.log("inputValues",inputValues);
    const [errMssg, setErrMssg] = useState<boolean | IAddressDetails>(initialState);

    const handleChange =(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>{
        setInputValues({...inputValues, [e.target.name] : e.target.value})
        setErrMssg(validateForm(inputValues));     
    }
    
    const handleSubmit =(e : SyntheticEvent) => {
        if(typeof saveAllAddressDetails(inputValues, props.allContacts) === "object"){
            e.preventDefault();
            setErrMssg(saveAllAddressDetails(inputValues, props.allContacts));
        }
    }
    const handleCancel = () => { 
        props.closeModal();
        setErrMssg(initialState)
    }
  return (
    props.show ? 
    <div>
        <form className='inputForm'  onSubmit={handleSubmit}>
            <div>
                <label>Name</label><br />
                <input type="text" name='name' id='inputTag' value={inputValues.name } onChange={handleChange}/>
                {typeof errMssg === "object" ? <p id='errorMessage'>{errMssg.name} </p> : <></>}
            </div>            
            <div>
                <label>Email</label><br />
                <input type="email" name='email' id='inputTag' value={inputValues.email} onChange={handleChange} />
                {typeof errMssg === "object" ? <p id='errorMessage'>{ errMssg.email} </p> : <></>}
            </div>
            <div className='mobileLandlineDiv' >
                <div>
                <label>Mobile</label><br />
                <input type="text" name='mobile' id='childInputs' value={inputValues.mobile} onChange={handleChange}/>
                {typeof errMssg === "object" ? <p id='errorMessage'>{errMssg.mobile} </p> : <></>}
                </div>
                <div>
                <label>Landline</label><br />
                <input type="text" name='landline' id='childInputs' value={inputValues.landline} onChange={handleChange}/>
                {typeof errMssg === "object" ? <p id='errorMessage'>{errMssg.landline} </p> : <></>}
                </div>
            </div>
            <div>
                <label>Website</label> <br />
                <input type="text" name='website' id='inputTag' value={inputValues.website} onChange={handleChange}/>
                {typeof errMssg === "object" ? <p id='errorMessage'>{ errMssg.website} </p> : <></>}
            </div>
            <div>
                <label>Address</label><br />
                <textarea typeof='text' name='address' rows={5} cols={50} value={inputValues.address} onChange={handleChange}/>
               { typeof errMssg === "object" ? <p id='errorMessage'>{errMssg.address} </p> : <></>}
            </div>
            <button id='addButton'>{props.isInitialState ?  "Add" :  "Save"}</button>
            <button id='cancelButton' onClick={handleCancel}>Cancel</button>
        </form>
    </div> : null 
  )
}

export default InputFormPage;