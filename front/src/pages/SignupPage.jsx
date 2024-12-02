import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forms.css";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      name, // make sure you send the same property names that the Backend is requesting
      email,
      password,
    };

    fetch(`${API_URL}/auth/signup`, {
      // make sure you add the endpoint
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Inform the server about the data format
      },
      body: JSON.stringify(newUser), // Convert the data to JSON
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.user) {
          navigate("/login");
        } else {
          throw new Error(jsonResponse.message);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        console.error("THIS IS AN ERROR: ", error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        type="text"
      />
      <label htmlFor="email">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="email"
      />
      <label htmlFor="password">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        type="password"
      />
      <button>Signup!</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}

export default SignupPage;
