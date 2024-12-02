import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  console.log("isLoggedIn: ", isLoggedIn);
  console.log("user: ", user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to={"/signup"}>Signup</NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
