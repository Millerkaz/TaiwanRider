import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import img from "../../../img";
import SearchBar from "../../../components/searchBar/searchBar";
import RestaurantBar from "./restaurantBar/restaurantBar";
import MobileToolBar from "../../../components/mobileToolBar/mobileToolBar";

const Main = (props) => {
  const [device, setDevice] = useState("mobile");

  useEffect(() => {
    const handleRWD = () => {
      if (window.innerWidth > 800) {
        setDevice("normal");
        return;
      }
      setDevice("mobile");
    };

    window.addEventListener("resize", handleRWD);
    handleRWD();

    return () => {
      window.removeEventListener("resize", handleRWD);
    };
  }, []);

  return (
    <React.Fragment>
      {device === "normal" ? (
        <>
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
            <SearchBar
              name=""
              className="mainPage__main--searchBar"
              inputClass="input__mainSearchBar"
              selectClass="select__mainSearchBar"
            />
          </div>
          <RestaurantBar className={`mainPage__main--restaurant`} />
        </>
      ) : (
        <>
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
          </div>
          <MobileToolBar />
        </>
      )}
    </React.Fragment>
  );
};

export default Main;
