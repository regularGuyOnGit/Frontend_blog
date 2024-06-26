import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/blogCreate.css";
import NavBar from "./NavBar";

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [blog, setBlog] = useState();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) {
      console.log("first submit");
      return;
    } else {
      (async () => {
        try {
          const postingBlog = await fetch(
            "http://localhost:3001/Author/blog-post/new",
            {
              mode: "cors",
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("SavedToken"),
              },
              body: JSON.stringify({
                title: title,
                blog: blog,
              }),
            }
          );
          console.log(postingBlog);
          setSubmit(false);
          navigate("/");
        } catch (e) {
          console.log(e);
          setSubmit(false);
        }
      })();
    }
  }, [submit]);
  return (
    <>
      <h1 className="createBlogHeader">Create a blog</h1>
      <NavBar />
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setSubmit(true);
        }}
        className="createBlog"
      >
        <div>
          <label htmlFor="title">Title of the Blog :</label>
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            required
            name="title"
            id="title"
            maxLength={100}
            cols="40"
            rows="2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="blog">Blog :</label>
          <textarea
            required
            onChange={(e) => setBlog(e.target.value)}
            name="blog"
            id="blog"
            maxLength={2000}
            cols="40"
            rows="5"
          ></textarea>
        </div>
        <div>
          <button type="submit">post blog</button>
        </div>
      </form>
    </>
  );
}

export default CreateBlog;
