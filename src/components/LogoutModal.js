import React from "react";
import Modal from "react-bootstrap/Modal";



const LogoutModal = () => {
  
  return (
    <Modal
      show={true}
      
      className="custom-modal logout-modal"
    >
      <Modal.Header className="border-0 mb-n4">
       
      </Modal.Header>
      <Modal.Body className="mt-n3">
        <h1>Log out</h1>
        
          <div>
            <p>You are now logged out.</p>
          </div>
        
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
