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
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isUserAuthenticated =
      localStorage.getItem("authenticated") === "true";
    setAuthenticated(isUserAuthenticated);
  }, []);

  const handleRegister = (formData) => {
    console.log("Register:", formData);
    setAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("authenticated", "true");
  };

  const handleLogin = (formData) => {
    console.log("Login:", formData);
    setAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("authenticated", "true");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
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
              <div>
                <div className="container">
                  <AuthForm onRegister={handleRegister} onLogin={handleLogin} />
                </div>
              </div>
            }
          />
          {authenticated ? (
            <Route
              path="/dashboard/*"
              element={
                <div>
                  <div className="container">
                    <Dashboard onLogout={handleLogout} />
                  </div>
                </div>
              }
            />
          ) : (
            <Route path="/dashboard/*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
