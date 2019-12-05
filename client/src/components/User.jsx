import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';


export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id)
  }

  render() {
    const { user } = this.props;
    return (
      <div className="user-page">
        {user === undefined ? <h2>Loading...</h2> : (
          <div>
            <img alt={user.name} src={user.photo} />
            {this.state.isEdit ?
              <Route path={'/users/:id/edit'} render={() => (
                <EditUser
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editUser();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/users/${this.props.userForm.id}`)
                  }}
                  userForm={this.props.userForm} />
              )} />
              :
              <>
              <h1>{user.name}</h1>
              <button onclick={() => {
                this.setState({
                  isEdit: true
                })
                this.props.history.push(`/users/${user.id}/edit`)

              }}>Edit</button>
              <button onClick={() => {
                this.props.deleteUser(user.id);
                this.props.history.push('/')
              }}>Delete</button>
            </>
          
        }
        
      </div>)}
    </div>)
  }
}


export default withRouter(User);


  