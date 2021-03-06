import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import EditArt from "../components/EditArt";

class ArtProfile extends Component {
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
    const { art } = this.props;
    return (
      <div className="art-page">
        {art === undefined ? (
          <h2>Loading . . .</h2>
        ) : (
          <div>
            <h1>{art.art_name}</h1>
            <img className="art-profile-img" src={art.url} alt="artname" />

            {this.state.isEdit ? (
              // <Route
              //   path={"/arts/:id/edit"}
              //   render={() => (
              <EditArt
                handleFormChange={this.props.handleFormChange}
                handleSubmit={e => {
                  e.preventDefault();
                  this.props.editArt();
                  this.setState({ isEdit: false });
                  // this.props.history.push(`/arts/${this.props.artForm.id}`);
                }}
                artForm={this.props.artForm}
              />
            ) : (
              // )}
              // />
              <>
                <br />

                {this.props.currentUser && this.props ? (
                  <div>
                    <button
                      onClick={() => {
                        this.setState({
                          isEdit: true
                        });
                        // this.props.history.push(`/arts/${art.id}/edit`);
                      }}
                    >
                      Edit
                    </button>{" "}
                    <button
                      onClick={() => {
                        this.props.deleteArt(art.id);
                        this.props.history.push("/");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ArtProfile);
