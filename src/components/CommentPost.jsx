import React from "react";
import { useState, useEffect } from "react";
import "../styles/Comment.css";

function CommentPost({ postID, submit, setSubmit }) {
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (submit && commentInput !== "") {
      (async () => {
        try {
          const commentPost = await fetch("http://localhost:3001/comments", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("SavedToken"),
            },
            body: JSON.stringify({
              postID: postID,
              comment: commentInput,
            }),
          });
          console.log(await commentPost.json());
          setSubmit(false);
          setCommentInput("");
        } catch (e) {
          console.log(e);
        }
      })();
    } else {
      return;
    }
  }, [submit]);
  return (
    <>
      <form
        id="commentForm"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmit(true);
        }}
      >
        <label htmlFor="">Comment:</label>
        <input
          type="text"
          name="comment"
          id="comment"
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
          value={commentInput}
          disabled={localStorage.getItem("SavedToken") ? false : true}
          className={
            localStorage.getItem("SavedToken") ? "btnEnabled" : "btnDisabled"
          }
          placeholder={
            localStorage.getItem("SavedToken")
              ? "Write a comment."
              : "Login to comment."
          }
        />
        <button
          className={commentInput.length <= 0 ? "btnDisabled" : "btnEnabled"}
          disabled={commentInput.length <= 0 ? true : false}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CommentPost;
