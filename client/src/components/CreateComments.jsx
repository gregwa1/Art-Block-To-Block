import React from "react";
import { withRouter } from "react-router-dom";

function CreateComment(props) {
  return (
    <div className="create-comments">
      <h2>Create Comments</h2>
      <form onSubmit={props.newComment}>
        <p>Comments:</p>
        <input
          type="string"
          name="username"
          value={props.commentForm.art_name}
          onChange={() => props.handleFormChange(this.props.commentForm)}
        />

        <p>Comment Link</p>
        <input
          type="string"
          name="art_name"
          value={props.commentForm.url}
          onChange={props.handleFormChange(this.props.commentForm)}
        />

        <p>Description</p>
        <input
          type="text"
          name="description"
          value={props.commentForm.description}
          onChange={props.handleFormChange(this.props.commentForm)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default withRouter(CreateComment);
