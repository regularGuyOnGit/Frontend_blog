import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import PostLinks from "./components/PostLinks";

function App() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    if (!localStorage.getItem("SavedToken")) {
      navigate("/login");
    } else {
      (async () => {
        try {
          const allPosts = await fetch(
            "http://localhost:3001/Author/all-blog-posts",
            {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("SavedToken"),
              },
            }
          );
          if (allPosts.status == 403) {
            setError(403);
          } else {
            const allPostFetched = await allPosts.json();
            setPosts(allPostFetched);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  return (
    <>
      <NavBar />
      <PostLinks posts={posts} />
      {/* This is to create the post */}
      <div className="createBlogLink">
        <Link to={"/blog/new"}>Create a new blog.</Link>
      </div>
    </>
  );
}

export default App;
