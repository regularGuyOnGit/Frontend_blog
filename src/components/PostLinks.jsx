import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/postLinks.css";

function PostLinks({ posts }) {
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
            <Link to={`/blog/${post._id}`} className="cells" key={post._id}>
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

export default PostLinks;
