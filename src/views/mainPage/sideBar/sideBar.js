import React from "react";
import ReactDOM from "react-dom";
import SideBarListCard from "../../../components/card/sideBarListCard/sideBarListCard";

import "./sideBar.scss";

const SideBar = (props) => {
  return (
    <React.Fragment>
      <div className="mainPage__sideBar-header">header</div>
      <div className="mainPage__sideBar-list">
        <SideBarListCard />
        <SideBarListCard />
        <SideBarListCard />
        <SideBarListCard />
        <SideBarListCard />
        <SideBarListCard />
      </div>
    </React.Fragment>
  );
};

export default SideBar;
