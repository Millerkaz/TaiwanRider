import { Link } from "react-router-dom";
import "./btn.scss";

const Btn = props => {
  switch (props.type) {
    case "link":
      return (
        <Link exact to={props.to} onClick={props.onClick} className={`btn btn--${props.color} ${props.className || ""}`}>
          {props.children}
        </Link>
      );

    case "anchor":
      return (
        <a href={props.href} className={`btn btn--${props.color} ${props.className || ""}`} target={props.blank ? " target='_blank'" : ""}>
          {props.children}
        </a>
      );

    default:
      return (
        <button onClick={props.onClick} className={`btn btn--${props.color} ${props.className || ""}`}>
          {props.children}
        </button>
      );
  }
};

export default Btn;
