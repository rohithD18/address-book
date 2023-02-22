import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { saveAllAddressDetails, validAddress, validateForm, validEmail, validLandline, validMobile, validName, validWebsite } from '../../AddressBookServices'
import { IAddressDetails, IErrorData } from '../../Interfaces';
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
    const [errMssg, setErrMssg] = useState<IErrorData>(initialState);

    const handleChange =(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>{
            setInputValues({...inputValues, [e.target.name] : e.target.value});        
        if(e.target.name === 'name'){
            setErrMssg({...errMssg, [e.target.name] : validName(inputValues)});            
        }else if(e.target.name === 'email'){
            setErrMssg({ ...errMssg, [e.target.name] : validEmail(inputValues)})
        }
        else if(e.target.name === 'mobile'){
            setErrMssg({ ...errMssg, [e.target.name] : validMobile(inputValues)})
        }
        else if(e.target.name === 'landline'){
            setErrMssg({ ...errMssg, [e.target.name] : validLandline(inputValues)})
        }
        else if(e.target.name === 'website'){
            setErrMssg({ ...errMssg, [e.target.name] : validWebsite(inputValues)})
        }else if(e.target.name === 'address'){
            setErrMssg({ ...errMssg, [e.target.name] : validAddress(inputValues)})
        }
    }
    // console.log(errMssg);
    const handleSubmit =(e : SyntheticEvent) => {
        if(!saveAllAddressDetails(inputValues, props.allContacts)){
            e.preventDefault();
            setErrMssg(validateForm(inputValues));
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
            <div >
                <label>Name</label><br />
                <input type="text" name='name' id='inputTag' value={inputValues.name } onChange={handleChange}/>
                <p id='errorMessage'>{errMssg.name}</p>
            </div>            
            <div className='inputDivs'>
                <label>Email</label><br />
                <input type="email" name='email' id='inputTag' value={inputValues.email} onChange={handleChange} />
                <p id='errorMessage'>{ errMssg.email} </p>
            </div>
            <div className='mobileLandlineDiv' >
                <div>
                <label>Mobile</label><br />
                <input type="text" name='mobile' id='childInputs' value={inputValues.mobile} onChange={handleChange}/>
                <p id='errorMessage'>{errMssg.mobile} </p>
                </div>
                <div>
                <label>Landline</label><br />
                <input type="text" name='landline' id='childInputs' value={inputValues.landline} onChange={handleChange}/>
                <p id='errorMessage'>{errMssg.landline} </p> 
                </div>
            </div>
            <div className='inputDivs'>
                <label>Website</label> <br />
                <input type="text" name='website' id='inputTag' value={inputValues.website} onChange={handleChange}/>
                <p id='errorMessage'>{ errMssg.website} </p>
            </div>
            <div className='inputDivs'>
                <label>Address</label><br />
                <textarea typeof='text' name='address' rows={5} cols={50} value={inputValues.address} onChange={handleChange}/>
                <p id='errorMessage'>{errMssg.address} </p>
            </div>
            <div className='addCancelDiv'>
                <input type="submit" id='addButton' value={props.isInitialState ?  "Add" :  "Save"}/>
                <input id='cancelButton' type="button" onClick={handleCancel} value ="Cancel"/>
            </div>
        </form>
    </div> : null 
  )
}

export default InputFormPage;