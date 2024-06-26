import React, { useEffect, useState } from "react";
import "../styles/comments.css";

function Comments({ comments, commentUpdate, setCommentUpdate }) {
  const [deleteUserComment, setDeleteUserComment] = useState(false);
  const [commentId, setCommentId] = useState();

  const deleteComment = (e, _id) => {
    e.preventDefault();
    setDeleteUserComment(true);
    setCommentId(_id);
  };

  useEffect(() => {
    if (!deleteUserComment) {
      console.log("delete not pressed");
      return;
    } else {
      (async () => {
        try {
          const deletecomment = await fetch(
            `http://localhost:3001/Author/comments/${commentId}`,
            {
              mode: "cors",
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("SavedToken"),
              },
            }
          );
          console.log(deletecomment);
          setDeleteUserComment(false);
          setCommentUpdate(!commentUpdate);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [deleteUserComment]);
  if (!comments) {
    return <>loading...</>;
  }
  return (
    <>
      <span className="commt">{comments ? "Comments" : ""}</span>
      {comments.map((comment, id) => {
        return (
          <div key={comment._id} className="userComments">
            <div className="userComment">
              <span>
                {comment.comments} <span>~{comment.commenter.username}</span>
              </span>
              <span>
                <button
                  onClick={(e) => deleteComment(e, comment._id)}
                  type="submit"
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Comments;
