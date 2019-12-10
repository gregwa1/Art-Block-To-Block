import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  readAllComments,
  destroyComments,
  createComments,
  updateArt,
  destroyArt,
  createArt,
  loginUser,
  registerUser,
  verifyUser,
  readAllArts
} from "./api-helper";
import Header from "./components/Header";
import Login from "./components/Login";
// import User from './components/User';
import Register from "./components/Register";
import Arts from "./components/Arts";
import CreateArt from "./components/CreateArt";
import ArtProfile from "./components/ArtProfile";
import CommentProfile from "./components/CommentProfile";
import CreateComments from "./components/CreateComments";
import Comments from "./components/Comments";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arts: [],
      artForm: {
        username: "default",
        art_name: "",
        url: "",
        description: ""
      },
      comments: [],
      commentForm: {
        username: "default",
        art_name: "",
        description: ""
      },
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  async componentDidMount() {
    await this.getArts();
    await this.getComments();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser });
    }
  }

  getArts = async () => {
    const arts = await readAllArts();
    this.setState({
      arts
    });
  };

  newArt = async e => {
    e.preventDefault();
    await createArt(this.state.currentUser.id, this.state.artForm);
    this.props.history.push("/arts");
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      artForm: {
        ...prevState.artForm,
        [name]: value
      }
    }));
  };

  mountEditForm = async id => {
    const arts = await readAllArts();
    const art = arts.find(el => el.id === parseInt(id));
    this.setState({
      artForm: art
    });
  };

  deleteArt = async id => {
    await destroyArt(id);
    this.setState(prevState => ({
      arts: prevState.arts.filter(art => art.id !== id)
    }));
    this.props.history.push("/arts");
  };

  // ---Comments ---

  getComments = async () => {
    const comments = await readAllComments();
    this.setState({
      comments
    });
  };

  newComment = async e => {
    e.preventDefault();
    await createComments(this.state.currentUser.id, this.state.commentForm);
  };

  mountEditForm = async id => {
    const comments = await readAllComments();
    const comment = comments.find(el => el.id === parseInt(id));
    this.setState({
      commentForm: comment
    });
  };

  deleteComment = async id => {
    await destroyComments(id);
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== id)
    }));
  };

  // -----Auth ---------------
  handleLoginButton = () => {
    this.props.history.push("/login");
  };

  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser });
    this.props.history.push("/");
  };

  handleRegister = async e => {
    e.preventDefault();
    debugger;
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
  };

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    });
  };

  authHandleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <div className="App">
        <Header
          handleLoginButton={this.handleLoginButton}
          handleLogout={this.handleLogout}
          currentUser={this.state.currentUser}
        />
        <Route
          path="/login"
          render={() => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData}
            />
          )}
        />

        <Route
          exact path="/"
          render={() => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData}
            />
          )}
        />
        <Route
          exact path="/register"
          render={() => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData}
            />
          )}
        />

        <Route
          exact
          path="/arts"
          render={() => <Arts arts={this.state.arts} />}
        />

        <Route
          exact path="/new/arts"
          render={() => (
            <CreateArt
              handleFormChange={this.handleFormChange}
              artForm={this.state.artForm}
              newArt={this.newArt}
            />
          )}
        />
        <Route
          exact path="/arts/:id"
          render={props => {
            const { id } = props.match.params;
            const art = this.state.arts.find(el => el.id === parseInt(id));
            return (
              <ArtProfile
                id={id}
                art={art}
                handleFormChange={this.handleFormChange}
                mountEditForm={this.mountEditForm}
                editArt={this.editArt}
                artForm={this.state.artForm}
                deleteArt={this.deleteArt}
              />
            );
          }}
        />

        <Route
          exact
          path="/comments"
          render={() => <Comments comments={this.state.comments} />}
        />

        <Route
          exact path="/new/comments"
          render={() => (
            <CreateComments
              handleFormChange={this.handleFormChange}
              commentForm={this.state.commentForm}
              newComment={this.newComment}
            />
          )}
        />
        <Route
          exact path="/comments/:id"
          render={props => {
            const { id } = props.match.params;
            const comment = this.state.comments.find(
              el => el.id === parseInt(id)
            );
            return (
              <CommentProfile
                id={id}
                comment={comment}
                handleFormChange={this.handleFormChange}
                mountEditForm={this.mountEditForm}
                editComment={this.editComment}
                commentForm={this.state.commentForm}
                deleteComment={this.deleteComment}
              />
            );
          }}
        />
      </div>
    );
  }
}
export default withRouter(App);
