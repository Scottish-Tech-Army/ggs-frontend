import React, { useContext } from "react";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { authContext } from './contexts/AuthContext';

export default function App() {
  const { token } = useContext(authContext);
  const { loading } = token;

  if (loading) {
    return (
          <p>Loading...</p>
    );
  }

  return (
    <Home/>
  );
};