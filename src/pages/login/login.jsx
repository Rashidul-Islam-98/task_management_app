import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/Auth/auth"; 
import { openDatabase } from "../../config/db";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userRef.current.value;
    const password = passwordRef.current.value;

    const db =await openDatabase();
    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");

    const userRequest = store.index("username").get(username);

    userRequest.onsuccess = (event) => {
      const user = event.target.result;

      if (user) {
        if (user.password === password) {
          dispatch({ type: "LOGIN", payload: user });
        } else {
          console.log("Login failed: Incorrect password");
        }
      } else {
        console.log("Login failed: User not found");
      }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
