import React from "react";
import "../styles/navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Nav({ formSubmit, successLogin, setSuccessLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btnLogin, setBtnLogin] = useState(false);
  //   console.log(btnLogin);
  return (
    <>
      <div className="navBar">
        <Link to={"/"}>Blog_Post_API</Link>
        {/* signUp form */}
        <Link to={"/signup"}>Signup</Link>
        {/* Login form */}
        <div className="login">
          {successLogin || localStorage.getItem("SavedToken") ? (
            <button
              onClick={() => {
                localStorage.clear();
                setBtnLogin(!btnLogin);
                setSuccessLogin(false);
              }}
              className="loginBtn"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setBtnLogin(!btnLogin);
              }}
              className="loginBtn"
            >
              login
            </button>
          )}
        </div>
      </div>
      <form
        onSubmit={(e) => formSubmit(e, username, password)}
        action=""
        className={btnLogin && !successLogin ? "formSee" : "formHidden"}
      >
        <label htmlFor="username">Enter Username : </label>
        <input
          required
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Enter Password : </label>
        <input
          required
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Nav;
