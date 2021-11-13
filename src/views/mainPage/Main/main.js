import React from "react";
import ReactDOM from "react-dom";
import img from "../../../img";
import LeafletMap from "../../../components/leafletMap/leafletMap";

const Header = (props) => {
  return (
    <React.Fragment>
      <div
        className={`mainPage__main--header ${
          props.isRecommendClick ? "header--active" : ""
        }`}
      >
        <img
          onClick={props.setIsRecommendClick}
          src={img.recommend}
          alt="recommend"
        />
        <img src={img.logo_w} alt="logo" />
      </div>
    </React.Fragment>
  );
};

export default Header;
