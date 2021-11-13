import React, { useEffect } from "react";

import logo_img from "../../img/logo.png";
import bike1_img from "../../img/bike1.png";
import bike2_img from "../../img/bike2.png";
import bike3_img from "../../img/bike3.png";
import bike4_img from "../../img/bike4.png";
import arrow_D_img from "../../img/icons/arrow_down.png";

import Header from "../mainPage/Main/main";
import SideBar from "../mainPage/sideBar/sideBar";
import LeafletMap from "../../components/leafletMap/leafletMap";

import "./indexPage.scss";

const IndexPage = (props) => {
  return (
    <React.Fragment>
      <div
        className="index "
        onClick={() => {
          document.querySelector(".index").classList.add("index--hidden");
        }}
      >
        <div className="index__container">
          <img className="index__container--logo" src={logo_img} alt="logo" />
          <h1>騎車的快感，每踩一步都會有不同的風景。</h1>
          <img className="index__container--arrowD" src={arrow_D_img} />
          <div className="index__bikes">
            <img className="index__bikes--1" src={bike1_img} alt="bike1" />
            <img className="index__bikes--2" src={bike2_img} alt="bike2" />
            <img className="index__bikes--3" src={bike3_img} alt="bike3" />
            <img className="index__bikes--4" src={bike4_img} alt="bike4" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IndexPage;
