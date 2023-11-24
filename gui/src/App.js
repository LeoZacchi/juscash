import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem("authenticated");
    return storedValue === "true";
  });

  useEffect(() => {
    localStorage.setItem("authenticated", authenticated.toString());
  }, [authenticated]);

  console.log(authenticated);

  const handleRegister = (formData) => {
    console.log("Register:", formData);

    localStorage.setItem("user", JSON.stringify(formData));
  };

  const handleLogin = (formData) => {
    console.log("Login:", formData);
    setAuthenticated(true);

    localStorage.setItem("authenticated", "true");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("leads");
    console.log("Logout");
    setAuthenticated(false);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <div>
                  <div className="container">
                    <AuthForm
                      onRegister={handleRegister}
                      onLogin={handleLogin}
                    />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              authenticated ? (
                <div>
                  <div className="container">
                    <Dashboard onLogout={handleLogout} />
                  </div>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
