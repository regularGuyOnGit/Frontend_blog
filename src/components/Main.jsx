import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

function Main({ posts, successLogin }) {
  if (!posts) {
    return <>loading..</>;
  }
  const dateFormatted = (postDate) => {
    const date = new Date(postDate).getDate();
    const year = new Date(postDate).getFullYear();
    const month = new Date(postDate).getMonth();
    return `${date}/${month}/${year}`;
  };

  return (
    <>
      <div className="blogGrid">
        {posts.allPosts.map((post, index) => {
          return (
            <Link
              state={{
                data: {
                  successLogin: successLogin,
                },
              }}
              to={`/blog/${post._id}`}
              className="cells"
              key={post._id}
            >
              <div className="title">{post.title}</div>
              <p className="post">{post.post}</p>
              <div className="author">
                <p>~{post.author.username}</p>
              </div>
              <div className="date">{dateFormatted(post.date)}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Main;
