import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../btn";
import { myselfPosition, map } from "../leafletMap/leafletMap";
import history from "../../helper/history";
import "./btnBar.scss";
import img from "../../img";

const BtnBar = (props) => {
  return (
    <div className={props.className}>
      <Btn
        onClick={() => {
          if (!myselfPosition) return;
          map.setView(myselfPosition, 16);
        }}
        color="location"
      >
        <img src={img.i_person} />
      </Btn>
      <Btn onClick={props.onCloseClick} color="location">
        <img src={img.i_close} />
      </Btn>
    </div>
  );
};

export default BtnBar;
