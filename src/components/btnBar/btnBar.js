import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../btn";
import { myselfPosition, map } from "../leafletMap/leafletMap";
import { listenMyselfPosition } from "../leafletMap/leafletMap";
import { action } from "../../store";
import history from "../../helper/history";
import "./btnBar.scss";
import img from "../../img";
import MobileToolBar from "../mobileToolBar/mobileToolBar";

const BtnBar = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={props.className}>
      <Btn
        color="location"
        onClick={() => {
          if (!myselfPosition) {
            listenMyselfPosition(dispatch);
            // });
            return;
          }
          dispatch(action.fetchNearBikeDataCreator(myselfPosition));
          map.setView(myselfPosition, 16);
        }}
      >
        <img src={img.i_gps} alt="search" />
      </Btn>
      <Btn
        onClick={() => {
          if (!myselfPosition) return;
          map.flyTo(myselfPosition, 16);
        }}
        color="location"
      >
        <img src={img.i_person} />
      </Btn>
      {props.className === "mobileToolBar__icons" ? (
        ""
      ) : (
        <Btn
          className={`mobileToolBar__close ${
            props.closeClick ? "close--active" : ""
          }`}
          onClick={props.onCloseClick}
          color="location"
        >
          {/* <img src={img.i_close} /> */}
        </Btn>
      )}
    </div>
  );
};

export default BtnBar;
