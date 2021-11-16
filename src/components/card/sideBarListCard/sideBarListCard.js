import React from "react";
import Wkt from "wicket";
import { action } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { map } from "../../leafletMap/leafletMap";
import img from "../../../img";

import "./sideBarListCard.scss";

const wkt = new Wkt.Wkt();

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

const SideBarListCard = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`sideBarListCard`}
      onClick={function () {
        wkt.read(props.Geometry);
        dispatch(action.selectRoadCreator(wkt.toJson(), props));
      }}
    >
      <div>
        <h1>{props.RouteName}</h1>
        <span>
          {props.City}/{props.Town}
        </span>
      </div>
      <span>起</span>
      <p>{props.RoadSectionStart}</p>
      <span>迄</span>
      <p>{props.RoadSectionEnd}</p>
      <div>
        <span>{props.Direction}</span>
        <span>
          <img src={img.i_route} />
          總長{props.CyclingLength}公尺
        </span>
      </div>
    </div>
  );
};

export default SideBarListCard;
