import React, { useState } from "react";
import { IAddressDetails } from "../../Interfaces";
import edit_icon from "../../assets/edit1.jpg";
import delete_icon from "../../assets/delete2.png";
import { deleteAddress, getAllAddressess } from "../../AddressBookServices";
import InputFormModal from "../inputFormModal/InputFormModal";

interface IProps {
  show: boolean;
  closeModal: () => void;
  showModal: () => void;
  isInitialState: boolean;
}
export const initialState = {
  id: 0,
  name : "",
  email : "",
  mobile : "",
  landline : "",
  website: "",
  address : "",
}
const ContactsPage: React.FC<IProps> = (props) => {
  const [contacts, setContacts] = useState<IAddressDetails[]>(
    getAllAddressess()
  );
  // console.log(contacts);
  const [individualContact, setIndividualContact] =
    useState<IAddressDetails>(initialState);

  const getContact = (contact: IAddressDetails) => {
    setIndividualContact(contact);
    props.closeModal();
  };
  const handleDeleteContact = (id: number) => {
    setIndividualContact(initialState);
    setContacts(deleteAddress(id, contacts));
  };
  const handleEdit = (contactDetails: IAddressDetails) => {
    setIndividualContact(contactDetails);
    if (contactDetails.id === individualContact.id) {
      props.showModal();
    }
    // console.log(individualContact);
  };

  return (
    <div className="contactsBody">
      <div className="allAddressess">
        <p id="contacts">CONTACTS</p>
        {contacts.map((item) => {
          return (
            <div
              key={item.id}
              className={item.id === individualContact.id ? "contactsDetails active" : "contactsDetails"}
              onClick={() => getContact(item)}
            >
              <h1 id="contactName">{item.name}</h1>
              <br />
              <p id="emailMobile">{item.email} </p>
              <br />
              <p id="emailMobile">{item.mobile} </p>
            </div>
          );
        })}
      </div>
      {individualContact.name !== "" ? (
        <div className="individualContactBody">
          <div className="nameEditDeleteDiv">
            <h1 id="addressName">{individualContact.name}</h1>
            <div className="editDeleteDiv">
              <div
                className="editButton"
                onClick={() => handleEdit(individualContact)}
              >
                <img id="editIcon" src={edit_icon} alt="edit" />
                <span  className="editDeletebtn">EDIT</span> 
              </div>
              <div
                className="deleteButton"
                onClick={() => handleDeleteContact(individualContact.id)}
              >
                {" "}
                <img id="deleteIcon" src={delete_icon} alt="delete" />
                <span className="editDeletebtn">DELETE</span> 
              </div>
            </div>
          </div>
          <div className="details">          
             <p id="emailDetails">Email: {individualContact.email} </p>
            <p id="mobileDetails">Mobile: {individualContact.mobile} </p>
            <p id="mobileDetails">Landline: {individualContact.landline} </p>
            <p>Website: {individualContact.website} </p>
            <div className="sameline">
              <p id="addressDetails">Address:</p>&nbsp;
              <pre id="detailedAddress">{individualContact.address} </pre>
              </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <InputFormModal
          show={props.show}
          closeModal={props.closeModal}
          individualAddress={individualContact}
          isInitialState={props.isInitialState}
          allContacts = {contacts}
        />
      </div>
    </div>
  );
};

export default ContactsPage;
