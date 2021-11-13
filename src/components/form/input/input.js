import React, { useState } from "react";
import "./input.scss";

/**
 * JSX
 * @param default init state value
 * @param type text (default) , email , checkbox...
 * @param placeholder
 */

const Input = (props) => {
  return (
    <input
      className={props.className || ""}
      type={props.type || "text"}
      placeholder={props.placeholder}
      {...props.input}
      required
    ></input>
  );
};

export default Input;
