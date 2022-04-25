import React, { useState, useContext, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { login } from "../services/auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const LoginModal = ({
  showLogin,
  loadingText,
  setLoadingText,
  loadingTimer,
  setLoadingTimer,
  handleLoginClose,
}) => {
  const { setTokenData } = useContext(authContext);

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
  }, [loginError]);

  const handleLogin = (event) => {
    login(code)
      .then((token) => {
        setTokenData(token);
        setCode("");
        setLoadingText("Logging in"); // Message for signed in users only
        setLoadingTimer(500);
        handleLoginClose();
      })
      .catch((error) => {
        console.error(error);
        setError(error.status);
        console.log("Error registered: " + error.status);
        if (error.status == 401) {
          setIncorrect(true);
        }
        setLoginError(true);
      });
    event.preventDefault();
  };
  return (
    <Modal
      show={showLogin}
      onHide={handleLoginClose}
      backdrop="static"
      keyboard={false}
      className="custom-modal login-modal"
    >
      <Modal.Header className="border-0 mb-n4">
        <Button
          variant="outline-primary"
          onClick={() => {
            console.log("Closer clicked");
            handleLoginClose();
          }}
          className="closer-position"
          bsPrefix="closer-color"
        >
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body scrollable className="mt-n5">
        <h1 style={{ textAlign: "center" }}>Ready to explore?</h1>
        <p className="text-center mb-5">
          Visit and collect all of the sights in your region or explore others
        </p>
        {error && (
          <p className="error-text text-center mt-n5">
            Invalid code - please try again.
          </p>
        )}
        <Form className="m-2" onSubmit={handleLogin}>
          <Form.Group controlId="formBasicCode">
            <Form.Control
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="password"
              placeholder="Enter code"
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
