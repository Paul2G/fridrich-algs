import React, { createContext, useState } from "react";

// Provider and Consumer are connected through their "parent" context
const ModalContext = createContext();

function ModalContextProvider(props){
  const [authenticationModal, setAuthenticationModal] = useState(false);
  const [algorithmModal, setAlgorithmModal] = useState(false);

  const modal = {
    authModal: {
      value: authenticationModal,
      setter: setAuthenticationModal
    },
    algModal: {
      value: algorithmModal,
      setter: setAlgorithmModal
    }
  }

  function isModalOpen(modalType){
    return modal[modalType].value;
  }

  function closeModal(){
    setAuthenticationModal(false);
    setAlgorithmModal(false);
  }

  function openModal(modalType){
    modal[modalType].setter(true);
  }

    return (
      <ModalContext.Provider value={{
        isModalOpen: isModalOpen,
        closeModal: closeModal,
        openModal: openModal
      }}>
        {props.children}
      </ModalContext.Provider>
    );
  }
  
  export { ModalContextProvider };
  export default ModalContext;