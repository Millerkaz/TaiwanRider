import React from "react";
import marker_icon from "../../../img/Marker.png";
import spot404_img from "../../../img/spotImg404.png";
import activity404_img from "../../../img/activity404.png";
import restaurant_img from "../../../img/restaurant404.png";
import { historyPush } from "../../../helper";
import "./listSmallCard.scss";

const showErrorImg = function (props, e = null) {
  if (e === null) {
    e = { target: { src: null } };
  }

  switch (props.type) {
    case "activity":
      e.target.src = activity404_img;
      return activity404_img;
    case "restaurant":
      e.target.src = restaurant_img;
      return restaurant_img;
    default:
      e.target.src = spot404_img;
      return spot404_img;
  }
};

const ListSmallCard = props => {
  const { city, term, page } = props.hash;

  return (
    <div
      className="listSmallCard"
      onClick={() => {
        historyPush(`/${props.type}/${city}/${term}/${page}/${props.id}`);
      }}
    >
      <div className="listSmallCard__img-container">
        <img
          onError={e => {
            showErrorImg(props, e);
          }}
          src={props.url ? props.url : showErrorImg(props)}
          alt={props.alt || "NO PICTURE"}
        />
      </div>
      <p className="listSmallCard__title">{props.title}</p>
      <div className="listSmallCard__icon">
        <img src={marker_icon} />
        <span>{props.location || props.address || props.organizer}</span>
      </div>
      <p className="listSmallCard__more">了解更多</p>
    </div>
  );
};

export default ListSmallCard;
