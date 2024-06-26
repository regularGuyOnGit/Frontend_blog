import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Comments from "./Comments";

function Blog() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [blog, setBlog] = useState();
  const [published, setPublished] = useState();
  const [comments, setComments] = useState();
  const [error, setError] = useState();
  const [submit, setSubmit] = useState(false);
  const [deleteSubmit, setDeleteSubmit] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState(true);

  // Use Effect for the deleting post.

  useEffect(() => {
    if (!deleteSubmit) {
      console.log("Delete button is not pressed");
      return;
    } else {
      (async () => {
        try {
          const deleteRequest = await fetch(
            `http://localhost:3001/Author/all-blog-posts/delete/${blogId}`,
            {
              mode: "cors",
              method: "Post",
              headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("SavedToken"),
              },
            }
          );
          console.log(deleteRequest);
          setDeleteSubmit(false);
          navigate("/");
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [deleteSubmit]);

  // Side Effect for post updating.

  useEffect(() => {
    if (!submit) {
      console.log("Post req not happend");
      return;
    } else {
      try {
        (async () => {
          const postUpdate = await fetch(
            `http://localhost:3001/Author/all-blog-posts/update/${blogId}`,
            {
              mode: "cors",
              method: "POST",
              headers: {
                Authorization: localStorage.getItem("SavedToken"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: title,
                blog: blog,
                published: published,
              }),
            }
          );
          if (postUpdate.status == 401) {
            setError(401);
          } else {
            setSubmit(false);
            alert("Successfully updated");
          }
        })();
      } catch (e) {
        console.log(e);
      }
    }
  }, [submit, commentUpdate]);

  // Side Effect for post fetching
  useEffect(() => {
    (async () => {
      try {
        const blogPost = await fetch(
          `http://localhost:3001/Author/blog/${blogId}`,
          {
            mode: "cors",
            method: "Get",
            headers: {
              Authorization: localStorage.getItem("SavedToken"),
              "Content-Type": "application/json",
            },
          }
        );
        if (blogPost.status == 404) {
          setError(blogPost.status);
        } else {
          const finalBlogPost = await blogPost.json();
          setTitle(finalBlogPost.title);
          setBlog(finalBlogPost.post);
          setPublished(finalBlogPost.published);
          setComments(finalBlogPost.comments);
          console.log(finalBlogPost);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [submit, commentUpdate]);

  return (
    <>
      {" "}
      <h1 className="createBlogHeader">Update blog</h1>
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
            value={title}
          />
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
            value={blog}
          />
        </div>
        <div>
          <label htmlFor="published">Publish :</label>
          <select
            onChange={(e) => setPublished(e.target.value)}
            name="published"
            id="published"
            value={published}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="updateFormButton">
          <button type="submit">Update</button>
        </div>
      </form>
      <div className="deletePostBtn">
        <button
          style={{ backgroundColor: "rgb(255, 0, 0)" }}
          onClick={(e) => {
            e.preventDefault();
            setDeleteSubmit(true);
          }}
        >
          Delete
        </button>
      </div>
      <Comments
        commentUpdate={commentUpdate}
        setCommentUpdate={setCommentUpdate}
        comments={comments}
      />
    </>
  );
}

export default Blog;
