import React from "react";
import { withRouter, Link } from "react-router-dom";

function Comments(props) {
  return (
    <div className="comments">
      {props.arts &&
        props.arts.map(comment => (
          <div className="comment-list" key={comment.id}
            onClick={(e) => {
              props.history.push(`/comments/${comment.id}`);
          }}>
            <img className="single-comment" src={comment.description} />
            <h1>{comment.name}</h1>
          </div>
        ))}
    </div>
  );
}

export default withRouter(Comments);
