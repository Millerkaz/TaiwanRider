import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";

import history from "./helper/history";
import LeafletMap from "./components/leafletMap/leafletMap";
import IndexPage from "./views/indexPage/indexPage";
import SideBar from "./views/mainPage/sideBar/sideBar";
import MainPage from "./views/mainPage/mainPage";

import "./sass/index.scss";

const App = (props) => {
  return (
    <React.Fragment>
      <IndexPage />
      <MainPage />
      <LeafletMap />
    </React.Fragment>
  );
};

export default App;
