import { IAddressDetails} from "./Interfaces";

export const getAllAddressess = () => {
  return JSON.parse(localStorage.getItem("Contacts") as any) || [];
}

export const saveAllAddressDetails = (values : IAddressDetails, allContacts : IAddressDetails[]) => {  
    // const addressInformations = getAllAddressess();
    console.log(validateForm(values));
    
    if(typeof validateForm(values) === "boolean"){
      let data : IAddressDetails = {
        id: allContacts.find((item : IAddressDetails) => 
            item.id === values.id) ? values.id : new Date().getTime(),
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        landline : values.landline,
        website : values.website,
        address: values.address
      }
      
        const editedValues = allContacts.map((item : IAddressDetails) => item.id === values.id ? data : item);
        let savedAddresses = allContacts.find((item : IAddressDetails) =>
         item.id === values.id) ? editedValues : [...allContacts, data];
        
        localStorage.setItem("Contacts", JSON.stringify(savedAddresses));
        // console.log(savedAddresses);
        
        return true;
    } else{
      console.log(validateForm(values));
      
      return validateForm(values);
    }
}

export const deleteAddress = (id : number, allContacts : IAddressDetails[]) => {
    // let allAddressArray : IAddressDetails[] = getAllAddressess();
    let updatedAddresses = allContacts.filter((item) => item.id !== id);
    localStorage.setItem("Contacts", JSON.stringify(updatedAddresses));
    return updatedAddresses;
};

const validName = (values : IAddressDetails) => {
  const nameFormat =/^[a-zA-Z\s]{4,256}$/;
  if(values.name === ""){
   return "Name is Required!"
  //  errorData.name = "Name is Required!"
  //  return false;
  }else if(!values.name.match(nameFormat)) {
    return "Enter valid Name!"
    // return false;
  }
  return ""
}
const validEmail = (values : IAddressDetails ) =>{
  const mailFormat = /^[a-zA-Z0-9.$_*]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,}$/;
  if(values.email === ""){
    return  "Email is Required!";
  }else if(!values.email.match(mailFormat)){
    return  "Enter valid Email address!";
    
  }else{
    return ""
  }
    
}
const validMobile = (values : IAddressDetails ) =>{
  const mobileFormat =/^[\+]+[0-9]{2,3}[\s]?[0-9]{3}[\s]?[0-9]{5,7}$/;
  if(values.mobile === ""){
    return "Mobile is Required!";   
  }else if(!values.mobile.match(mobileFormat)){
    return "Enter valid Number!"
  }else{    
    return ""
  }
}
const validLandline = (values : IAddressDetails ) =>{
  const landlineFormat =/^[0][0-9]{2,3}[\s]?[0-9]{3,4}[\s]?[0-9]{4}$/;
  if(values.landline === ""){
   return "landline is Required!";
  }else if(!values.landline.match(landlineFormat)) {  
    return "Enter valid landline Number!"
  }else {
    return ""
  }
}
const validWebsite = (values : IAddressDetails ) =>{
  // const websiteFormat =/^([https|http]:)?\/?\/?(www.)+[a-zA-Z0-9#!:?+=&%!]+\.([a-zA-Z]+){2,}$/;
  let websiteFormat = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  if(values.website === ""){
    return "website is Required!";
  }else if(!values.website.match(websiteFormat)){
    return "Enter valid Website Address!";
  }else {
   return "";
  }
}
const validAddress = (values : IAddressDetails ) =>{
  if(values.address === ""){
    return "address is Required!";
  }else{
   return "";
  }
}
export const validateForm = (values : IAddressDetails) => {
  let errorData : IAddressDetails = {
    id: 1,
    name: validName(values),
    email: validEmail(values),
    mobile: validMobile(values),
    landline : validLandline(values),
    website : validWebsite(values),
    address: validAddress(values),
  }  
  // console.log(errorData);
  
  return (errorData.name === "" && errorData.email === "" && errorData.mobile === "" && errorData.landline === "" && errorData.address === "" && errorData.website === "") ?  true : errorData;
}