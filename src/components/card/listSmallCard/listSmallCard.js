import React from "react";

import "./listSmallCard.scss";

const ListSmallCard = (props) => {
  return (
    <div className="listSmallCard" onClick={() => {}}>
      <p className="listSmallCard__title">{props.title}</p>
      {/* <p className="listSmallCard__address">{props.address}</p> */}
      {/* <p className="listSmallCard__open">{props.open}</p> */}
      <a href={`tel:${props.phone}`} className="listSmallCard__phone">
        {props.phone}
      </a>
    </div>
  );
};

export default ListSmallCard;
