import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      return;
    } else {
      (async () => {
        try {
          const logoutSuccess = await fetch(
            "http://localhost:3001/Author/logout",
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (logoutSuccess.status == 500) {
            setError(500);
          } else {
            localStorage.clear();
            navigate("/login");
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [login]);

  return (
    <>
      <nav>
        <button className="home">
          <Link to={"/"}>Home</Link>
        </button>
        <button onClick={() => setLogin(false)} className="logout">
          Logout
        </button>
      </nav>
    </>
  );
}

export default NavBar;
