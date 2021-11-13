import React from "react";
import ReactDOM from "react-dom";
import img from "../../../img";
import SearchBar from "../../../components/searchBar/searchBar";
import LeafletMap from "../../../components/leafletMap/leafletMap";

const Header = (props) => {
  return (
    <React.Fragment>
      <div
        className={`mainPage__main--header ${
          props.isRecommendClick ? "header--active" : ""
        }`}
      >
        <div className="mainPage__main--imgs">
          <img
            onClick={props.setIsRecommendClick}
            src={img.recommend}
            alt="recommend"
          />
          <img src={img.logo_w} alt="logo" />
        </div>
        <SearchBar className="mainPage__main--searchBar" />
      </div>
    </React.Fragment>
  );
};

export default Header;
