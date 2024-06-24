import React from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

function App() {
  const [loginCredentials, SetLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [successLogin, setSuccessLogin] = useState(false);
  const [posts, setPosts] = useState();

  const formSubmit = (eve, username, password) => {
    eve.preventDefault();
    SetLoginCredentials({
      username: username,
      password: password,
    });
  };

  //? Database Posts request.
  useEffect(() => {
    (async function () {
      try {
        const rawPosts = await fetch("http://localhost:3001", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const posts = await rawPosts.json();
        setPosts(posts);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [loginCredentials]);

  //? Login and assigning token to local storage.

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
          setSuccessLogin(true);
          localStorage.setItem("SavedToken", token.token);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [loginCredentials]);

  return (
    <>
      <Nav
        formSubmit={formSubmit}
        setSuccessLogin={setSuccessLogin}
        successLogin={successLogin}
      />
      <Main posts={posts} successLogin={successLogin} />
      <Footer />
    </>
  );
}

export default App;
