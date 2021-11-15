import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSmallCard from "../../../../components/card/listSmallCard/listSmallCard";
import BtnBar from "../../../../components/btnBar/btnBar";
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "./restaurantBar.scss";

const renderRestaurantCard = (data) => {
  return data.map((shop) => (
    <SwiperSlide>
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
    </SwiperSlide>
  ));
};

const RestaurantBar = (props) => {
  const [closeClick, setCloseClick] = useState(false);
  const restaurant = useSelector((state) => state.nearRestaurantData);

  if (!restaurant) return <></>;

  return (
    <>
      <BtnBar
        className="mainPage__main--restaurant-icons "
        onCloseClick={() => setCloseClick((pre) => !pre)}
      />
      <div className={props.className || null}>
        <div
          className={`mainPage__main--restaurant-list ${
            closeClick ? "restaurant--hidden " : ""
          }`}
        >
          <Swiper
            direction={`vertical`}
            height={100}
            slidesPerView={1}
            spaceBetween={12}
          >
            {renderRestaurantCard(restaurant)}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RestaurantBar;
