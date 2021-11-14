import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../btn";
import history from "../../helper/history";
import "./pageBtnBar.scss";

const PageBtnBar = (props) => {
  return (
    <div className={props.className}>
      <Btn color="pageBar" onClick={() => {}}>
        {"X"}
      </Btn>
    </div>
  );
};

export default PageBtnBar;
