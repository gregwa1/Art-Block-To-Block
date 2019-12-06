import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
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
      </div>
    );
  }
}
export default withRouter(App);
