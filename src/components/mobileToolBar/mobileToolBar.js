import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchBar from "../searchBar/searchBar";
import BtnBar from "../btnBar/btnBar";
import Btn from "../btn";

import RestaurantBar from "../../views/mainPage/Main/restaurantBar/restaurantBar";
import "./mobileToolBar.scss";

const MobileToolBar = () => {
  const [closeClick, setCloseClick] = useState(false);

  //close--active in mobileToolBar.css

  return ReactDOM.createPortal(
    <div className="mobileToolBar">
      <span
        className={`btn mobileToolBar__close ${
          !closeClick ? "" : "close--active"
        }`}
        onClick={() => setCloseClick((pre) => !pre)}
      ></span>
      <div
        className={`mobileToolBar__container ${
          !closeClick ? "mobile--hidden" : ""
        }`}
      >
        <BtnBar
          className="mobileToolBar__icons"
          onCloseClick={() => setCloseClick((pre) => !pre)}
        />
        <p>查詢YouBike站點</p>
        <SearchBar />
        <p>鄰近餐廳</p>
        <RestaurantBar closeClick={closeClick} style="mobile" />
      </div>
    </div>,
    document.querySelector("#root")
  );
};

export default MobileToolBar;
