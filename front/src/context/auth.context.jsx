import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  /* 
      Functions for handling the authentication status (isLoggedIn, isLoading, user)
      will be added here later in the next step
    */

  function storeToken(token) {
    localStorage.setItem("authToken", token);
  }

  function authenticateUser() {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    console.log("Do we have a token? ", storedToken);

    if (storedToken) {
      fetch(`${API_URL}/auth/verify`, {
        method: "GET",
        headers: { authorization: `Bearer ${storedToken}` },
      })
        .then((response) => {
          if (!response.ok) {
            // token expired
            throw new Error("User not verified");
          }
          return response.json();
        })
        .then((jsonResponse) => {
          // Token not expired
          setUser(jsonResponse);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
          console.error(error);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }

  function logoutUser() {
    localStorage.removeItem("authToken");
    authenticateUser();
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
