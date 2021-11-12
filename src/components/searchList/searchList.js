import React from "react";
import noData_img from "../../img/Saly-17.png";

import ListSmallCard from "../card/listSmallCard/listSmallCard";

import "./searchList.scss";

const renderList = (dataObj, hash = null, type = "spot") => {
  if (!dataObj) {
    return <div>Loading...</div>;
  }

  if (Object.keys(dataObj).length === 0) {
    return (
      <div className="main__errorImg">
        <img src={noData_img} alt={`No data`} />
      </div>
    );
  }

  let dataArray = hash ? dataObj[hash.page] : dataObj;

  return dataArray.map(spotObj => {
    return <ListSmallCard type={type} key={spotObj.ID} id={spotObj.ID} title={spotObj.Name} location={spotObj.City} url={spotObj.Picture.PictureUrl1} alt={spotObj.Picture.PictureDescription1} address={spotObj.Address?.slice(0, 3)} hash={hash || { city: "all", term: "all", page: 1 }} organizer={spotObj.Organizer} />;
  });
};

// props=> page (哪裡使用此component)
//props=> data = {1:[{ID,Name,City,Picture,Address,},{},...]}
//props=> hash (當前 hash 頁數)
//type=> spot/activity/restaurant
const SearchList = props => {
  const hash = props.hash || null;
  return <div className={`searchList ${props.className}`}>{renderList(props.data, hash, props.type)}</div>;
};

export default SearchList;
