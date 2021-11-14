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
let init = false;
let myself = null;
const myselfMarker = window.L.icon({
  iconUrl: myself_img,
  className: "icon--myself",
});

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

  map.locate({
    // setView: true, // 是否讓地圖跟著移動中心點
    watch: true, // 是否要一直監測使用者位置
    maxZoom: 18, // 最大的縮放值
    enableHighAccuracy: true, // 是否要高精準度的抓位置
    timeout: 10000, // 觸發locationerror事件之前等待的毫秒數
  });

  const geoConfirmHandler = (e) => {
    if (!init) {
      map.setView(e.latlng, 17);
      dispatch(action.fetchNearBikeDataCreator(map.getCenter()));
      dispatch(action.fetchRestaurantDataCreator(map.getCenter()));
    }
    init = true;

    if (myself) {
      map.removeLayer(myself);
      // console.log("remove");
    }

    myself = window.L.marker(e.latlng, { icon: myselfMarker });
    myself.addTo(map);

    // console.log(e);
  };

  // const geoDenyHandler = () => {
  //   init = true;
  //   map.setView([25.037850742582183, 121.54882907867433], 18);
  //   myself = window.L.marker([25.037850742582183, 121.54882907867433]);
  //   myself.addTo(map);
  // };

  map.on("locationfound", geoConfirmHandler);
  // map.on("locationerror", geoDenyHandler);
};

const renderStationDetail = (station) => {
  return `
  <div class="stationDetailCard">
    <h3 class="stationDetailCard__title">${station.name.tw[1]}</h3>
    <span class="stationDetailCard__address">${station.address.Zh_tw}</span>
    <span class="stationDetailCard__type">${station.name.tw[0]}</span>
    <div class="stationDetailCard__bike">      
      <h1>${station.canRentBikes}</h1>
      <h1>${station.needReturnBikes}</h1>
      <span>可借</span>      
      <span>可還</span>      
    </div>
    <button class="btn">搜尋附近美食</button>
  </div>
  `;
};

const LeafletMap = (props) => {
  const bikeData = useSelector((state) => state.bikeData);
  const nearRestaurantData = useSelector((state) => state.nearRestaurantData);
  const nearBikeData = useSelector((state) => state.nearBikeData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!init) {
      mapBuild(dispatch);
    }

    return () => {
      console.log("off");
      map.off();
    };
  }, []);

  useEffect(() => {
    if (!nearBikeData.bikeData) return "無資料";
    if (nearBikeData.bikeData.length !== nearBikeData.bikeAvailableData.length)
      return "資料數量不一致";

    const bikeStationArray = nearBikeData.bikeAvailableData.map(
      (station, i) => {
        return {
          UID: station.StationUID,
          canRentBikes: station.AvailableRentBikes,
          needReturnBikes: station.AvailableReturnBikes,
          coords: {
            lat: nearBikeData.bikeData[i].StationPosition.PositionLat,
            lon: nearBikeData.bikeData[i].StationPosition.PositionLon,
          },
          name: {
            tw: nearBikeData.bikeData[i].StationName.Zh_tw.split("_"),
            en: nearBikeData.bikeData[i].StationName.En.split("_"),
          },
          address: nearBikeData.bikeData[i].StationAddress,
        };
      }
    );

    console.log(bikeStationArray);

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
        .bindPopup(renderStationDetail(station))
        .on("click", (e) => {
          console.log(e);
          map.setView(e.latlng, 18);
        });
    });

    map.setView(map.getCenter(), 16);

    let nearMarksGroup = window.L.layerGroup(bikeMarks);
    nearMarksGroup.addTo(map);

    return () => {};
  }, [nearBikeData]);

  useEffect(() => {
    if (nearRestaurantData === null) return;
    const restaurantMarksArray = nearRestaurantData.map((shop) => {
      return {
        id: shop.ID,
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
          className: "pin--restaurant",
        }),
      }).on("click", (e) => {
        document
          .querySelectorAll(".pin--restaurant")
          .forEach((ele) => ele.classList.remove("icon--active"));
        e.originalEvent.originalTarget.classList.add("icon--active");
        dispatch(action.selectRestaurantCreator(shop.id));
        map.setView(e.latlng, 17);
      });
    });

    let nearShopsGroup = window.L.layerGroup(restaurantMarks);
    nearShopsGroup.addTo(map);
  }, [nearRestaurantData]);

  return <div id="map" class="map"></div>;
};

export default LeafletMap;

// let string =
// "MULTILINESTRING ((121.459078261471 24.9904629485521,121.459140352908 24.9903592756744,121.45927049931 24.9902347091192,121.459394738695 24.9900480737092,121.459473636828 24.9898822798823,121.459415693462 24.9895720419361,121.459079447145 24.9892165828113,121.458902849937 24.9889186820278,121.458808341359 24.988673821462,121.458713595834 24.9883650057189,121.458578599553 24.9880203094367,121.458428700919 24.9877410502439,121.458092089007 24.9872928249699,121.457709800758 24.9870736045431,121.457252394162 24.9866681362051,121.4570467884 24.986422947608,121.457872174157 24.9858246748098,121.45718646123 24.9848919022824,121.455574893688 24.9841557449454,121.455586266061 24.984048481999,121.455731946641 24.9836620345553,121.455936651184 24.9833236619823,121.455934951045 24.9828626051225))";

// const array = string
// .slice(18, -2)
// .split(",")
// .map((string) => {
//   return [string.split(" ")[1], string.split(" ")[0]].map((v) =>
//     Number(v)
//   );
// });

// const options = {
// use: window.L.polyline,
// delay: 800,
// dashArray: [30, 40],
// weight: 10,
// color: "#009BB1",
// pulseColor: "#FFFFFF",
// };

// const path = window["leaflet-ant-path"].antPath(array, options);
// path.addTo(myMap);
