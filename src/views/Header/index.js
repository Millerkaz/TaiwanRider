import React from "react";
import ReactDOM from "react-dom";
import HeaderNav from "./headerNav/headerNav";
import { historyPush } from "../../helper";

import logo from "../../img/logo.png";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            historyPush("/");
          }}
          className="header__logo"
        />

        <HeaderNav className="header__navBar" />
      </React.Fragment>
    );
  }
}

export default Header;
