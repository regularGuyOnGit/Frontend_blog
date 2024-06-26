import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    setLoginCredentials({
      username: usernameInput,
      password: passwordInput,
    });
  };
  console.log(loginCredentials);

  // Side Effect for login

  useEffect(() => {
    if (localStorage.getItem("SavedToken")) {
      console.log("Already logged in!");
      navigate("/");
      return;
    }

    if (loginCredentials.username == "" || loginCredentials.password == "") {
      console.log("no login credentials");
      return;
    } else {
      (async () => {
        try {
          const login = await fetch("http://localhost:3001/Author/login", {
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
          if (login.status == 400 || login.status == 401) {
            setLoginCredentials({
              username: "",
              password: "",
            });
            setUsernameInput("");
            setPasswordInput("");

            setError("Incorrect username and password!");
          } else {
            const jwtToken = await login.json();
            console.log(jwtToken);
            localStorage.setItem("SavedToken", jwtToken.token);
            setLoginCredentials({
              username: "",
              password: "",
            });
            setUsernameInput("");
            setPasswordInput("");
            setError("");
            navigate("/");
          }
        } catch (e) {
          console.log(e);
          setLoginCredentials({
            username: "",
            password: "",
          });
          setUsernameInput("");
          setPasswordInput("");
        }
      })();
    }
  }, [loginCredentials]);

  return (
    <>
      <h1 className="loginHead">Login Page</h1>
      <form className="loginForm" onSubmit={(e) => formSubmit(e)}>
        <div>
          <label htmlFor="username">Username : </label>
          <input
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            type="text"
            name="username"
            required
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
            id="password"
          />
        </div>
        {error && (
          <div style={{ color: "red" }} className="errorMessage">
            *{error}
          </div>
        )}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
