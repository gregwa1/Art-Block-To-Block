import React from 'react'
import { withRouter } from 'react-router-dom';

function EditUser(props) {
  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={props.newArt}>
      
        <p>User Name:</p>
        <input
          type="string"
          name="username"
          value={props.userForm.username}
          onChange={props.handleFormChange}
        />
        <p>Email</p>
        <input
          type="string"
          name="email"
          value={props.userForm.email}
          onChange={props.handleFormChange}
        />

        <p>Change Password</p>
        <input
          type="text"
          name="password_digest"
          value={props.userForm.description}
          onChange={props.handleFormChange}
        />

        <button>Update</button>
      </form>
    </div>
  )
}


export default withRouter(EditUser);
