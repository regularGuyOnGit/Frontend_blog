import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav2.css";
import { useEffect, useState } from "react";

function Nav2() {
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (!logout) {
      return;
    } else {
      (async () => {
        try {
          const logoutReq = await fetch("http://localhost:3001/logout", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log(logoutReq);
          localStorage.clear();
          setLogout(false);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [logout]);

  return (
    <div className="links">
      <Link to={"/"}>Blog_Post_API</Link>
      <Link to={"/signup"}>Signup</Link>
      {localStorage.getItem("SavedToken") ? (
        <div className="logoutDiv" onClick={() => setLogout(true)}>
          Logout
        </div>
      ) : (
        <Link to={"/login"}>login</Link>
      )}
    </div>
  );
}

export default Nav2;
