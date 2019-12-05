import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { loginUser, registerUser, verifyUser, readAllArts } from "./api-helper";
import Header from "./components/Header";
import Login from "./components/Login";
// import User from './components/User';
import Register from "./components/Register";
import Arts from "./components/Arts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arts:[],
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  async componentDidMount() {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser });
    }
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

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
  }

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


  getArts = async () => {
    const arts = await readAllArts();
    this.setState({
      arts
    })
    console.log(arts)
  }

  render() {
    return (
      <div className="App">
        <Header
          handleLoginButton={this.handleLoginButton}
          handleLogout={this.handleLogout}
          currentUser={this.state.currentUser}
        />
        <Route
          exact
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
          exact
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
          exact path="/arts"
          render={() => (
            <Arts
              arts = {this.state.arts}
            />
          )}
        />

      </div>
    );
  }
}
export default withRouter(App);
