import React, { useEffect, useRef, useState } from "react";
import myself_img from "../../img/icons/Mine.png";
import { PTX } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../../store";

import Btn from "../btn";
import img from "../../img";
import "./leafletMap.scss";
import "./icon.scss";

export let map;
export let myself = null;
export let myselfPosition;

const searchZoom = 8;
const pinZoom = 17;

let isFirstLocale = true;

export const listenMyselfPosition = (dispatch) => {
  const myselfMarker = window.L.icon({
    iconUrl: myself_img,
    className: "icon--myself",
  });

  const geoConfirmHandler = (e) => {
    if (isFirstLocale) {
      map.setView(e.latlng, pinZoom);
      dispatch(action.fetchNearBikeDataCreator(map.getCenter()));
      dispatch(action.fetchRestaurantDataCreator(map.getCenter()));
      isFirstLocale = false;
    }
    if (myself) {
      map.removeLayer(myself);
      // console.log("remove");
    }

    myselfPosition = e.latlng;
    myself = window.L.marker(e.latlng, { icon: myselfMarker });
    myself
      .bindPopup(
        `
    <div class="detailCard">    
      <button class="btn btn--detailCard" data-lat=${e.latlng.lat} data-lng=${e.latlng.lng}>搜尋附近美食</button>
    </div>
    `
      )
      .addTo(map);
  };

  map.locate({
    // setView: true, // 是否讓地圖跟著移動中心點
    watch: true, // 是否要一直監測使用者位置
    maxZoom: 18, // 最大的縮放值
    enableHighAccuracy: true, // 是否要高精準度的抓位置
    timeout: 10000, // 觸發locationerror事件之前等待的毫秒數
  });

  map.on("locationfound", geoConfirmHandler);
};

const mapBuild = (dispatch) => {
  map = window.L.map("map").setView([24, 121], 5);

  window.L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // window.L.tileLayer(
  //   `https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_LEAFLET_KEY}`,
  //   {}
  // ).addTo(map);

  // map.attributionControl.addAttribution(
  //   '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors'
  // );

  listenMyselfPosition(dispatch);

  // const geoDenyHandler = () => {
  //   init = true;
  //   map.setView([25.037850742582183, 121.54882907867433], 18);
  //   myself = window.L.marker([25.037850742582183, 121.54882907867433]);
  //   myself.addTo(map);
  // };

  // map.on("locationerror", geoDenyHandler);
};

const renderStationDetail = (station) => {
  return `
  <div class="detailCard">
    <h3 class="detailCard__title">${station.name.tw[1]}</h3>
    <span class="detailCard__address">${station.address.Zh_tw}</span>
    <span class="detailCard__type">${station.name.tw[0]}</span>
    <div class="detailCard__bike">      
      <h1>${station.canRentBikes}</h1>
      <h1>${station.needReturnBikes}</h1>
      <span>可借</span>      
      <span>可還</span>      
    </div>
    <button class="btn btn--detailCard" data-lat=${station.coords.lat} data-lng=${station.coords.lng}>搜尋附近美食</button>
  </div>
  `;
};

const renderRestaurantDetail = (shop) => {
  return `
  <div class="detailCard">
    <div class="detailCard__img">
      <img src=${shop.url ? shop.url : img.fakeRestaurant} alt=${
    shop.alt || "NO PICTURE"
  } onError="()=>{${img.fakeRestaurant}}"/>
    </div>    
    <h3 class="detailCard__title">${shop.title}</h3>
    <span class="detailCard__address">${shop.address}</span>
    <span class="detailCard__type">${shop.open}</span>    
  </div>
  `;
};

const mergeBikeData = (bikeDataFromState) => {
  return bikeDataFromState.bikeAvailableData.map((station, i) => {
    if (station.StationUID !== bikeDataFromState.bikeData[i].StationUID) return;

    return {
      UID: station.StationUID,
      canRentBikes: station.AvailableRentBikes,
      needReturnBikes: station.AvailableReturnBikes,
      coords: {
        lat: bikeDataFromState.bikeData[i].StationPosition.PositionLat,
        lng: bikeDataFromState.bikeData[i].StationPosition.PositionLon,
      },
      name: {
        tw: bikeDataFromState.bikeData[i].StationName.Zh_tw.split("_"),
        en: bikeDataFromState.bikeData[i].StationName.En.split("_"),
      },
      address: bikeDataFromState.bikeData[i].StationAddress,
    };
  });
};

/////////////////////////////////////////////////////////////////////////////////////////

const LeafletMap = (props) => {
  const selectRestaurant = useSelector((state) => state.selectRestaurant);
  const bikeData = useSelector((state) => state.bikeData);
  const nearRestaurantData = useSelector((state) => state.nearRestaurantData);
  const nearBikeData = useSelector((state) => state.nearBikeData);
  const dispatch = useDispatch();

  const nearBikeMarksGroup = useRef(null);
  const nearShopsGroup = useRef(null);
  const searchBikeMarksGroup = useRef(null);

  useEffect(() => {
    mapBuild(dispatch);

    const detailCardClickHandler = (e) => {
      if (e.target.closest(".btn--detailCard")) {
        const coords = {
          lat: +e.target.dataset.lat,
          lng: +e.target.dataset.lng,
        };

        map.setView(coords, 16);

        dispatch(action.fetchRestaurantDataCreator(coords));
      }
    };

    document
      .querySelector(".map")
      .addEventListener("click", detailCardClickHandler);

    return () => {
      console.log("remove");
      document
        .querySelector(".map")
        .removeEventListener("click", detailCardClickHandler);
    };
  }, []);

  useEffect(() => {
    if (nearBikeMarksGroup.current) {
      map.removeLayer(nearBikeMarksGroup.current);
    }
    if (!nearBikeData?.bikeData) {
      console.log("附近1公里內無站點");
      return;
    }
    if (
      nearBikeData.bikeData.length !== nearBikeData.bikeAvailableData.length
    ) {
      console.log("附近站點資料數量無法匹配");
      return;
    }

    const bikeStationArray = mergeBikeData(nearBikeData);

    const bikeMarks = bikeStationArray.map((station) => {
      return window.L.marker(station.coords, {
        icon: window.L.divIcon({
          className: "pin--bike",
          html: `
          <div style="background-image: linear-gradient(180deg, white ${
            100 -
            (station.canRentBikes /
              (station.canRentBikes + station.needReturnBikes)) *
              100
          }%, #d9ef08 ${
            (station.canRentBikes /
              (station.canRentBikes + station.needReturnBikes)) *
            100
          }%);">
            <img src=${img.i_bike}></img>
          </div>
            `,
        }),
      })
        .bindPopup(renderStationDetail(station, dispatch))
        .on("click", (e) => {
          map.setView(e.latlng, pinZoom);
        });
    });

    map.setView(myselfPosition, 16);
    nearBikeMarksGroup.current = window.L.layerGroup(bikeMarks);
    map.addLayer(nearBikeMarksGroup.current);
  }, [nearBikeData]);

  useEffect(() => {
    if (nearShopsGroup.current) {
      map.removeLayer(nearShopsGroup.current);
    }
    if (nearRestaurantData === null) {
      return;
    }
    const restaurantMarksArray = nearRestaurantData.map((shop) => {
      return {
        title: shop.Name,
        id: shop.ID,
        url: shop.Picture.PictureUrl1,
        alt: shop.Picture.PictureDescription1,
        address: shop.Address,
        open: shop.OpenTime,
        coords: {
          lat: shop.Position.PositionLat,
          lng: shop.Position.PositionLon,
        },
        phone: shop.Phone,
      };
    });

    const restaurantMarks = restaurantMarksArray.map((shop) => {
      return window.L.marker(shop.coords, {
        icon: window.L.icon({
          iconUrl: img.i_shopPin,
          className: `pin--restaurant pin--restaurant--${shop.id}`,
        }),
      })
        .bindPopup(renderRestaurantDetail(shop, dispatch))
        .on("click", (e) => {
          document
            .querySelectorAll(".pin--restaurant")
            .forEach((ele) => ele.classList.remove("icon--active"));
          e.originalEvent.originalTarget.classList.add("icon--active");
          dispatch(action.selectRestaurantCreator(shop.id));
          map.setView(e.latlng, pinZoom);
        });
    });

    nearShopsGroup.current = window.L.layerGroup(restaurantMarks);
    map.addLayer(nearShopsGroup.current);
  }, [nearRestaurantData]);

  useEffect(() => {
    if (searchBikeMarksGroup.current) {
      map.removeLayer(searchBikeMarksGroup.current);
    }
    if (!bikeData?.bikeData) {
      console.log("所查資料不存在");
      return;
    }
    if (bikeData.bikeData.length !== bikeData.bikeAvailableData.length) {
      console.log("搜尋結果資料數量無法匹配");
      return;
    }

    //DRY:
    //////////////////////////////

    const bikeStationArray = mergeBikeData(bikeData);

    const bikeMarks = bikeStationArray.map((station) => {
      return window.L.marker(station.coords, {
        icon: window.L.divIcon({
          className: "pin--bike",
          html: `
          <div style="background-image: linear-gradient(180deg, white ${
            100 -
            (station.canRentBikes /
              (station.canRentBikes + station.needReturnBikes)) *
              100
          }%, #d9ef08 ${
            (station.canRentBikes /
              (station.canRentBikes + station.needReturnBikes)) *
            100
          }%);">
            <img src=${img.i_bike}></img>
          </div>
            `,
        }),
      })
        .bindPopup(renderStationDetail(station, dispatch))
        .on("click", (e) => {
          map.setView(e.latlng, pinZoom);
        });
    });

    //////////////////////////////

    if (bikeStationArray.length !== 0) {
      let searchCenter = bikeStationArray[0].coords;
      map.setView(searchCenter, searchZoom);
      searchBikeMarksGroup.current = window.L.layerGroup(bikeMarks);
      map.addLayer(searchBikeMarksGroup.current);
    }
  }, [bikeData]);

  return <div id="map" class="map"></div>;
};

export default LeafletMap;
