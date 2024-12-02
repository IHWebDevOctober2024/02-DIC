// IMPORTS from libraries
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// STYLES
import "./App.css";

// PAGES
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// COMPONENTS
import Navbar from "./components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      fetch(`${API_URL}/api`, {
        method: "GET",
        headers: { authorization: `Bearer ${storedToken}` },
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonres) => console.log(jsonres))
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
