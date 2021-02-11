import React from "react";
import "../styles/Card.css";

const Card = ({ name, url, caption }) => {
  return (
    <div className="city">
      <a href={url}>
        <div className="city-image">
          <img class="card-img" src={url} alt="meme" />
        </div>
      </a>
      <div className="description">
        <h3 className="creator-name">{name}</h3>
        <p className="caption">{caption}</p>
      </div>
    </div>
  );
};

export default Card;
