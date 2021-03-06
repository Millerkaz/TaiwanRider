import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Main from "./Main/main";
import SideBar from "./sideBar/sideBar";
import LeafletMap from "../../components/leafletMap/leafletMap";
import "./mainPage.scss";
import { action } from "../../store";

const MainPage = (props) => {
  const [isRecommendClick, setIsRecommendClick] = useState(false);
  const isErrorShow = useSelector((state) => state.isErrorShow);
  const dispatch = useDispatch();

  const isRecommendHandler = useCallback(() => {
    setIsRecommendClick((pre) => !pre);
  }, []);

  return (
    <div className="mainPage">
      <div
        className={`mainPage__sideBar ${
          isRecommendClick ? "" : "sideBar--hidden"
        }`}
      >
        <SideBar />
      </div>
      <Main
        isRecommendClick={isRecommendClick}
        setIsRecommendClick={isRecommendHandler}
        className="mainPage__main"
      />
      <div
        className={`mainPage__error ${
          !isErrorShow.showError ? "error--hidden" : ""
        }`}
        onClick={() => {
          dispatch(action.closeErrorScreenCreator());
        }}
      >
        <div>
          <p>{`(^-^*)`}</p>
          <p>
            {isErrorShow.mes === "no data"
              ? "找無站點"
              : "此功能請先開啟定位並重新整理唷！"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
