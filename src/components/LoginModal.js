import React, { useState, useContext, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { login } from "../services/auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import xPrimary from "./x-primary.svg";

const LoginModal = ({
  setLoadingText,
  setLoadingTimer,
  handleLoginClose,
}) => {
  const { setUnitName } = useContext(authContext);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState(false); // flags if a log in error
  const [incorrect, setIncorrect] = useState(false); // specifically flags if user error
  
  useEffect(() => {
    const fetchError = async () => {
      if (incorrect) {
        setLoadingText("Log in to access landmarks");
      } else {
        setLoadingText("Landmarks unavailable, try logging in later");
      }
    };
    loginError && fetchError();
    !loginError && setLoadingText("Log in to access landmarks");
  }, [loginError, incorrect, setLoadingText]);

  const handleLogin = (event) => {
    login(code)
      .then(({unitName}) => {
        setUnitName(unitName);
        setCode("");
        setLoadingText("Logging in"); // Message for signed in users only
        setLoadingTimer(500);
        handleLoginClose();
      })
      .catch((error) => {
        console.error(error);
        setError(error.status);
        console.log("Error registered: " + error.status);
        if (error.status === 404) {
          setIncorrect(true);
        }
        setLoginError(true);
      });
    event.preventDefault();
  };
  return (
    <Modal
      show={true}
      onHide={handleLoginClose}
      backdrop="static"
      keyboard={false}
      className="custom-modal login-modal"
    >
      <Modal.Header className="border-0 mb-n3">
      <Button
          variant="outline-primary"
          onClick={handleLoginClose}
          className="closer-position"
          aria-label="Close"
        >
          <img src={xPrimary} style={{
          width: "200%",
          height: "200%",
          }}
          alt=""/>
        </Button>
      </Modal.Header>
      <Modal.Body className="mt-n3">
        <h1 style={{ textAlign: "center" }}>Ready to explore?</h1>
        <p className="text-center mb-3">
          Visit and collect all of the sights in your region or explore others
        </p>
        {error && (
          <p className="error-text text-center mt-n3">
            Invalid code - please try again.
          </p>
        )}
        <Form className="m-2 mt-n2" onSubmit={handleLogin}>
          <Form.Group controlId="formBasicCode">
            <Form.Control
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter unit name"
              className="w-100 my-2 mx-auto"
            />
          </Form.Group>
          <Button bsPrefix="btn-branding w-100 my-2 mx-auto" type="submit">
            Start Exploring
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
