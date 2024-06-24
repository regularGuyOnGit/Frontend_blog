import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/loginPage.css";
import Footer from "./Footer";

function LogInpage() {
  const [loginCredentials, SetLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const formSubmit = (eve, username, password) => {
    eve.preventDefault();
    SetLoginCredentials({
      username: username,
      password: password,
    });
  };
  useEffect(() => {
    if (localStorage.getItem("SavedToken")) {
      // console.log("local Storage is present");
      return;
    } else if (
      loginCredentials.username == "" ||
      loginCredentials.password == ""
    ) {
      // console.log("empty fields");
      return;
    } else {
      (async function () {
        try {
          // console.log(loginCredentials.username, loginCredentials.password);
          const rawToken = await fetch("http://localhost:3001", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: loginCredentials.username,
              password: loginCredentials.password,
            }),
          });

          const token = await rawToken.json();
          localStorage.setItem("SavedToken", token.token);
          navigate("/");
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [loginCredentials]);
  return (
    <>
      <h1 className="formHeading">Login Form</h1>
      <form
        className="loginPage"
        action=""
        onSubmit={(e) => formSubmit(e, username, password)}
      >
        <div>
          <label htmlFor="username">Username </label>
          <input
            required
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">submit</button>
      </form>
      <div className="signup">
        <Link to={"/signup"}>
          Not a user <span>Sign-Up</span> now.
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default LogInpage;
