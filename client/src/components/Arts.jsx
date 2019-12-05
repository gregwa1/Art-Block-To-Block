import React from "react";
import { withRouter } from "react-router-dom";

function Arts(props) {
  return (
    <div className="art-gallery">
      {props.arts &&
        props.arts.map(art => (
          <div className="art-list">
            <img className="single-art" src={art.url} />
            <h1>
              {art.name} hello
              onClick={props.art}
            </h1>
          </div>
        ))}
    </div>
  );
}

export default withRouter(Arts);
