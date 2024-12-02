import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import "./Forms.css";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [keepSession, setKeepSession] = useState(false);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email,
      password,
      keepSession
    };

    fetch(`${API_URL}/auth/login`, {
      // make sure you add the endpoint
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Inform the server about the data format
      },
      body: JSON.stringify(user), // Convert the data to JSON
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.authToken) {
          storeToken(jsonResponse.authToken);
          authenticateUser();
          navigate("/");
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
      <label htmlFor="keepSession">Keep me logged in</label>
      <input
        checked={keepSession}
        onChange={(e) => setKeepSession(e.target.checked)}
        id="keepSession"
        type="checkbox"
      />
      <button>Login!</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}

export default LoginPage;
