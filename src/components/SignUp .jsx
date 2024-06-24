import React from "react";
import "../styles/signup.css";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [userCre, setUserCre] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [loginError, setLoginError] = useState();
  console.log(loginError);
  console.log();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      userCre.username == "" ||
      userCre.password == "" ||
      userCre.first_name == "" ||
      userCre.last_name == ""
    ) {
      console.log("Cant search not all fields are filled up");
      return;
    } else {
      (async () => {
        try {
          const formFilling = await fetch("http://localhost:3001/signup", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: userCre.username,
              first_name: userCre.first_name,
              last_name: userCre.last_name,
              password: userCre.password,
            }),
          });
          const formFillingFinal = await formFilling.json();
          console.log(formFillingFinal);
          if (formFillingFinal.message) {
            navigate("/");
          }
          if (formFillingFinal.errors) {
            console.log(formFillingFinal.errors);
            setLoginError(formFillingFinal.errors);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [userCre]);
  return (
    <>
      <h1
        className="formSignup"
        style={{ textAlign: "center", height: "auto", padding: "1rem 0rem" }}
      >
        User Sign-up
      </h1>
      <form
        className="formSignup"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setUserCre({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
          });
        }}
      >
        <div>
          <label htmlFor="first_name">Enter First Name :</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
            required
            value={first_name}
          />
        </div>
        <div>
          <label htmlFor="last_name">Enter Last Name :</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
            required
            value={last_name}
          />
        </div>
        <div>
          <label htmlFor="username">Enter User Name :</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Enter Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            value={password}
          />
        </div>

        <button type="submit">Sumbit</button>
        <div className="loginError">
          {loginError
            ? loginError.map((error, index) => {
                return (
                  <p style={{ color: "red" }} key={index}>
                    *{error.msg}
                  </p>
                );
              })
            : ""}
        </div>
      </form>

      <Footer />
    </>
  );
}

export default SignUp;
