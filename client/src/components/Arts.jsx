import React from "react";
import { withRouter, Link } from "react-router-dom";

function Arts(props) {
  return (
    <div className="art-gallery">
      {props.arts &&
        props.arts.map(art => (
          <div className="art-list" key={art.id}
            onClick={(e) => {
              props.history.push(`/arts/${art.id}`);
          }}>
            <img className="single-art" src={art.url} />
            <h1>{art.name}</h1>
          </div>
        ))}
    </div>
  );
}

export default withRouter(Arts);
