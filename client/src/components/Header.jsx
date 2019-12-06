import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <h1>
        <Link to='/'> Art Block To Block</Link>
        <Link to="/arts"><button>Gallery</button></Link>
        <Link to="/new/arts"><button>Create Art</button></Link>
      </h1>
      <div>
        {props.currentUser
          ?
          <>
            <p>{props.currentUser.username}</p>
            <button onClick={props.handleLogout}>logout</button>
          </>
          :
          <button onClick={props.handleLoginButton}>Login/register</button>
        }
      </div>
    </header>
  )
}
