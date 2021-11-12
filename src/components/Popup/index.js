import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import history from "../../helper/history";

import { action } from "../../store";

const Popup = props => {
  const dispatch = useDispatch();
  const isWindowShow = useSelector(state => state.popWindow.show);

  return ReactDOM.createPortal(
    <div
      className={`popup__overlay ${isWindowShow ? "" : "hidden"}`}
      onClick={() => {
        // if (!e.target.classList.contains('popup__overlay')) return;
        history.push(`${props.backPath}`);
        dispatch(action.popWindowHideCreator());
      }}
    >
      <div
        className="popup__container"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </div>,
    document.querySelector("#popup")
  );
};

export default Popup;
