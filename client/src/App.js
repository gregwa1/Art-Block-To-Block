import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
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
    // console.log(arts)
  };

  newArt = async e => {
    e.preventDefault();
    await createArt(this.state.currentUser.id, this.state.artForm);
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

  deleteArt = async (id) => {
    await destroyArt(id);
    this.setState(prevState => ({
      arts: prevState.arts.filter(art => art.id !== id)
    }))
  }

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
          path="/register"
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
          path="/new/arts"
          render={() => (
            <CreateArt
              handleFormChange={this.handleFormChange}
              artForm={this.state.artForm}
              newArt={this.newArt}
            />
          )}
        />
        <Route
          path="/arts/:id"
          render={(props) => {
            const { id } = props.match.params;
            const art = this.state.arts.find(el => el.id === parseInt(id));
            return <ArtProfile
              id={id}
              art={art}
              handleFormChange={this.handleFormChange}
              // mountEditForm={this.mountEditForm}
              // editArt={this.editArt}
              artForm={this.state.artForm}
              deleteArt={this.deleteArt} />
          }}
        />
      </div>
    );
  }
}
export default withRouter(App);
