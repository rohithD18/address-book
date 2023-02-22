import React, { useState } from "react";
import blog_icon from "../../assets/blog-icon.png";
import ContactsPage from "../contactsPage/ContactsPage";

const HomePage: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isInitialState, setIsInitialState] = useState<boolean>(false);
  const handleCloseModal = () => {
    setShow(false);
    setIsInitialState(false);
  }

  
  return (
    <div>
      <div className="headingDiv">
        <h1 id="headerOne">Address Book</h1>
      </div>
      <div className="navDiv">
        <div className="homeAddDiv">
        <button id="homeAddBtns" onClick={() => setShow(false)}>
          HOME
        </button>
        <button
          id="homeAddBtns"
          onClick={() => {
            setShow(true);
            setIsInitialState(true);
          }}
        >
          +ADD
        </button>
        </div>
        <img id="blogIcon" src={blog_icon} alt="blog_icon" />
      </div>
      <div className="componentsDiv">
        <ContactsPage
          show={show}
          closeModal={handleCloseModal}
          showModal={() => setShow(true)}
          isInitialState={isInitialState}
        />
      </div>
    </div>
  );
};

export default HomePage;
