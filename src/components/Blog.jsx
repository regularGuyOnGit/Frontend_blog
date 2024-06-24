import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/blog.css";
import Footer from "./Footer";
import Nav2 from "./Nav2";
import CommentPost from "./CommentPost";

function Blog() {
  const location = useLocation();
  // const post = location.state.data.post;
  const loggedIn = location.state.data.successLogin;
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const [post, setPost] = useState();
  const [submit, setSubmit] = useState(false);

  const dateFormatted = (postDate) => {
    const date = new Date(postDate).getDate();
    const year = new Date(postDate).getFullYear();
    const month = new Date(postDate).getMonth();
    return `${date}/${month}/${year}`;
  };

  useEffect(() => {
    (async function () {
      try {
        const rawPost = await fetch(`http://localhost:3001/posts/${id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const post = await rawPost.json();
        setPost(post);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [submit, id]);

  if (!post) {
    return <>Loading..</>;
  }
  return (
    <>
      <Nav2 />
      <div className="blogPageGrid">
        <div className="titleBlog">{post.title}</div>
        <div className="postBlog">{post.post}</div>
        <div className="dateAndAuthor">
          <span>Posted At: {dateFormatted(post.date)}</span>
          <span>~{post.author.username}</span>
        </div>
      </div>
      <div
        onClick={() => {
          setLoad(!load);
        }}
        className="loadComments"
      >
        {load ? "Hide Comments..." : "Read Comments..."}
      </div>

      {load && (
        <CommentPost
          submit={submit}
          setSubmit={setSubmit}
          loggedIn={loggedIn}
          postID={post._id}
        />
      )}

      {load &&
        post.comments.map((comment, index) => {
          return (
            <div key={index} className="mapComment">
              <div>
                <span>{comment.comments}</span>
                <span> ~{comment.commenter.username}</span>
              </div>
              <div>{dateFormatted(comment.date)}</div>
            </div>
          );
        })}

      <Footer />
    </>
  );
}

export default Blog;
