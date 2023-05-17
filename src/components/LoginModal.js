import React, { useState, useContext, useEffect } from "react";

// context:
import { authContext } from "../contexts/AuthContext";
import { login, register } from "../services/auth";

// components:
import Button from "react-bootstrap/Button";
// import Button from "./GGSbuttonOne";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const LOGIN = "login";
const REGISTER = "register";

const LoginModal = ({ handleLoginClose, successOrFailResponse }) => {
  const { setUnit } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState(LOGIN);

  useEffect(() => {
    setError("");
  }, [state]);

  const handleLogin = (event) => {
    login(email)
      .then((unit) => {
        setUnit(unit);
        handleLoginClose();
        // Call the function that tells parent <LandingPage/>
        // what to do on successful log in. When the 
        // arg has value true the response was successful:
        successOrFailResponse(true)
      })
      .catch((error) => {
        // The function that tells parent <LandingPage/>
        // what to do on failure to log in:
        successOrFailResponse(false)
        console.error(error);
        if (error.status === 404) {
          setError(
            "Email address not found. If this is your first visit, please register first."
          );
        } else {
          setError("Problem logging in. Please try again.");
        }
      });
    event.preventDefault();
  };

  const handleRegister = (event) => {
    register(email, name)
      .then((unit) => {
        setUnit(unit);
        handleLoginClose();
      })
      .catch((error) => {
        console.error(error);
        if (error.status === 409) {
          setError("Email address already registered. Please log in instead.");
        } else {
          setError("Problem registering. Please try again.");
        }
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
      <Modal.Header className="border-0 mb-n3"></Modal.Header>
      <Modal.Body className="mt-n3">
        {state === LOGIN && (
          <>
            <h1 style={{ textAlign: "left" }}>Ready to explore?</h1>
            <p className="text-left mb-3">
              Visit and collect all of the sights in your region or explore
              others
            </p>
            {error && <p className="error-text text-center mt-n3">{error}</p>}
            <Form className="m-2 mt-n2" onSubmit={handleLogin}>
              <Form.Group controlId="formBasicCode">
                <Form.Control
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="email address"
                  placeholder="Enter email address"
                  className="w-100 my-2 mx-auto"
                />
              </Form.Group>
              <Button 
              variant = "customGGS"
              className="buttonOperable" 
              type="submit"
              >
              Start Exploring
              </Button>
              </Form>
            <p className="text-left mt-3">
              Is this your first visit? Please{" "}
              <span className="switch-mode" onClick={() => setState(REGISTER)}>
                register first
              </span>
              .
            </p>
          </>
        )}
        {state === REGISTER && (
          <>
            <h1 style={{ textAlign: "center" }}>Register Team</h1>
            <p className="text-center mb-3">
              Enter an email and optional name to register your team. We will
              hold your email address in accordance with our{" "}
              <a
                href="https://www.girlguidingscotland.org.uk/privacy/"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </a>
              .
            </p>
            {error && <p className="error-text text-center mt-n3">{error}</p>}
            <Form className="m-2 mt-n2" onSubmit={handleRegister}>
              <Form.Group controlId="formBasicCode">
                <Form.Control
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="email address"
                  placeholder="Enter email address"
                  className="w-100 my-2 mx-auto"
                />
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="team name"
                  placeholder="Enter team name (optional)"
                  className="w-100 my-2 mx-auto"
                />
              </Form.Group>
              <Button 
              variant = "customGGS"
              className="buttonOperable" 
              type="submit">
                Register
              </Button>
            </Form>
            <p className="text-center mt-3">
              Already registered? Please{" "}
              <span className="switch-mode" onClick={() => setState(LOGIN)}>
                <br/>log in
              </span>
              .
            </p>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
