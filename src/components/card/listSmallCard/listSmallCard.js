import React from "react";
import { action } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { map } from "../../leafletMap/leafletMap";

import "./listSmallCard.scss";

const listClickHandler = (props, dispatch) => {
  map.setView(props.coords, 18);
  // layer.openPopup(props.coords);
  document
    .querySelectorAll(".pin--restaurant")
    .forEach((ele) => ele.classList.remove("icon--active"));
  document
    .querySelector(`.pin--restaurant--${props.id}`)
    .classList.add("icon--active");
  dispatch(action.selectRestaurantCreator(props.id));
};

const ListSmallCard = (props) => {
  const dispatch = useDispatch();
  const selectRestaurant = useSelector((state) => state.selectRestaurant);

  return (
    <div
      className={`listSmallCard ${
        selectRestaurant === props.id ? "listSmallCard--active" : ""
      }`}
      onClick={() => {
        listClickHandler(props, dispatch);
      }}
    >
      <p className="listSmallCard__title">{props.title}</p>
      {/* <p className="listSmallCard__address">{props.address}</p> */}
      {/* <p className="listSmallCard__open">{props.open}</p> */}
      <a href={`tel:${props.phone}`} className="listSmallCard__phone">
        {props.phone}
      </a>
    </div>
  );
};

export default ListSmallCard;
