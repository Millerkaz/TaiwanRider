import React, { useState } from "react";

import Main from "./Main/main";
import SideBar from "./sideBar/sideBar";
import LeafletMap from "../../components/leafletMap/leafletMap";
import "./mainPage.scss";

const MainPage = (props) => {
  const [isRecommendClick, setIsRecommendClick] = useState(false);

  return (
    <div className="mainPage">
      <div
        className={`mainPage__sideBar ${
          isRecommendClick ? "" : "sideBar--hidden"
        }`}
      >
        <SideBar isRecommendClick={isRecommendClick} className="" />
      </div>
      <Main
        isRecommendClick={isRecommendClick}
        setIsRecommendClick={() => {
          setIsRecommendClick((pre) => !pre);
        }}
        className="mainPage__main"
      />

      {/* <LeafletMap /> */}
    </div>
  );
};

export default MainPage;
