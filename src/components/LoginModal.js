import React, {useState } from "react";
import { login } from "../services/auth";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

const LoginModal = ({setAuthToken, showLogin, handleLoginClose}) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");



  const handleLogin = (event) => {
      login(code)
      .then((token) => {
        setAuthToken(token);
        setCode("");
        handleLoginClose();
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };
  return (
    <Modal
        show={showLogin}
        onHide={handleLoginClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Body>
          <Modal.Title>Modal title</Modal.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicCode">
                <Form.Control 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                type="password" 
                placeholder="Enter code" />
            </Form.Group>
            <Button type="submit">Start Exploring</Button>
          </Form>
        </Modal.Body>
      </Modal>
  );
};

export default LoginModal;
