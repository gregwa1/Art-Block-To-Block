import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <nav>
        <Link to='/'> Art Block To Block</Link>
        <Link to="/arts"><button>Gallery</button></Link>
        <Link to="/new/arts"><button>Create Art</button></Link>
      </nav>
      <div className="username">
        {props.currentUser
          ?
          <>
            <p>Welcome&nbsp;</p>
            <h1>{props.currentUser.username}!</h1>
            <button onClick={props.handleLogout}>logout</button>
          </>
          :
          <button onClick={props.handleLoginButton}>Login/register</button>
        }
      </div>
    </header>
  )
}
