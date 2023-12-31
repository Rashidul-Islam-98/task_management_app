import { useState } from "react";
import { Link } from "react-router-dom";
import { openDatabase } from "../../config/db";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [expertise, setExpertise] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const db = await openDatabase();
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');

      const registrationData = {
        username,
        email,
        role,
        expertise,
        password,
      };

      const request = await store.add(registrationData);

      request.onsuccess = () => {
        window.location.replace("/login");
      };

      request.onerror = () => {
        setError(true);
        console.log(error)
      };
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };



  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="registerColumn">
          <label>Username :</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email : </label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="registerColumn ">
          <label>Role : </label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your role..."
            onChange={(e) => setRole(e.target.value)}
          />
          <label>Expertise : </label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your expertise..."
            onChange={(e) => setExpertise(e.target.value)}
          />
        </div>
        <div className="registerColumn">
          <label>Password : </label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
    </div>
  );
}
