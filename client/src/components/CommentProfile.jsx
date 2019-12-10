import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import EditComment from "../components/EditComment";

class CommentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="comment-page">
        {comment === undefined ? (
          <h2>Loading . . .</h2>
        ) : (
          <div>
            <h1>{comment.art_name}</h1>
            <img src={comment.url} alt="comments" />

            {this.state.isEdit ? (
              <Route
                path={"/comments/:id/edit"}
                render={() => (
                  <EditComment
                    handleFormChange={this.props.handleFormChange}
                    handleSubmit={e => {
                      e.preventDefault();
                      this.props.EditComment();
                      this.setComment({ isEdit: false });
                      this.props.history.push(`/comments/${this.props.commentForm.id}`);
                    }}
                    commentForm={this.props.commentForm}
                  />
                )}
              />
            ) : (
              <>
                <h1>{comment.name}</h1>
                <button
                  onClick={() => {
                    this.setState({
                      isEdit: true
                    });
                    this.props.history.push(`/comments/${comment.id}/edit`);
                  }}
                >
                  Edit
                </button>{" "}
                }
                <button
                  onClick={() => {
                    this.props.deleteComment(comment.id);
                    this.props.history.push("/");
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(CommentProfile);
