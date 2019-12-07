import React from 'react'
import { withRouter } from 'react-router-dom';

function EditArt(props) {
  return (
    <div>
      <h3>Edit Art</h3>
      <form onSubmit={props.newArt}>
      
        <p>Art Name:</p>
        <input
          type="text"
          name="art_name"
          value={props.artForm.art_name}
          onChange={props.handleFormChange}
        />

        <p>Art Link</p>
        <input
          type="text"
          name="url"
          value={props.artForm.url}
          onChange={props.handleFormChange}
        />

        <p>Description</p>
        <input
          type="text"
          name="description"
          value={props.artForm.description}
          onChange={props.handleFormChange}
        />

        <button>Update</button>
      </form>
    </div>
  )
}


export default withRouter(EditArt);
