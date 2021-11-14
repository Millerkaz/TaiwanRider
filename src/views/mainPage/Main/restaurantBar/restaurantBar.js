import React from "react";
import { useSelector } from "react-redux";
import ListSmallCard from "../../../../components/card/listSmallCard/listSmallCard";
import PageBtnBar from "../../../../components/pageBtnBar/pageBtnBar";

import "./restaurantBar.scss";

const renderRestaurantCard = (data) => {
  return data.map((shop) => (
    <ListSmallCard
      key={shop.ID}
      title={shop.Name}
      id={shop.ID}
      phone={shop.Phone.split(",")[0]}
      open={shop.OpenTime}
      address={shop.Address}
      coords={{
        lat: shop.Position.PositionLat,
        lng: shop.Position.PositionLon,
      }}
    />
  ));
};

const RestaurantBar = (props) => {
  const restaurant = useSelector((state) => state.nearRestaurantData);

  if (!restaurant) return <></>;

  return (
    <div className={props.className || null}>
      <PageBtnBar className="mainPage__main--restaurant-icons " />
      {renderRestaurantCard(restaurant)}
    </div>
  );
};

export default RestaurantBar;
