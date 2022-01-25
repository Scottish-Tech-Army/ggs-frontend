import React, { useState, useContext } from 'react';
import { authContext } from '../contexts/AuthContext';
import { login } from "../services/auth";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

const LoginModal = ({showLogin, handleLoginClose}) => {
  const { setTokenData} = useContext(authContext);


    const [code, setCode] = useState("");
    const [error, setError] = useState("");

  const handleLogin = (event) => {
      login(code)
      .then((token) => {
        setTokenData(token);
        setCode("");
        handleLoginClose();
      })
      .catch(error => {
          console.error(error);
        setError(error.status);
      });
    event.preventDefault();
  };
  return (
    <Modal
        show={showLogin}
        onHide={handleLoginClose}
        backdrop="static"
        keyboard={false}
        //centered
        //size="lg"
        className="custom-modal login-modal"
      >
        <Modal.Header className="border-0 mb-n4">
          <Button
            variant="outline-primary"
            onClick={handleLoginClose}
            className="closer-position"
            bsPrefix="closer-color"
          >
            &times;
          </Button>
        </Modal.Header>
        <Modal.Body scrollable className="mt-n5">
          <h1 style={{textAlign: "center"}}>Girl Guiding Scotland Treasure Hunt</h1>
          <Form className="m-3" onSubmit={handleLogin}>
            <Form.Group controlId="formBasicCode">
                <Form.Control 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                type="password" 
                placeholder="Enter code"
                className="w-75 my-2 mx-4" />
            </Form.Group>
            <Button bsPrefix="btn-branding w-75 my-2 mx-4" type="submit">Start Exploring</Button>
          </Form>
          {error && <p>{error}: Please enter your membership number.</p>}
        </Modal.Body>
      </Modal>
  );
};

export default LoginModal;
