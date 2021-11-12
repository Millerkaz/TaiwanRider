import React, { useEffect, useRef, useState } from "react";

import myself_img from "../../img/icons/Mine.png";
import { PTX } from "../../API";
import "./leafletMap.scss";
import "./icon.scss";

const myselfMarker = window.L.icon({
  iconUrl: myself_img,
  className: "icon--myself",
});

const LeafletMap = (props) => {
  const [coords, setCoords] = useState(null);
  const map = useRef(null);
  const init = useRef(false);
  const myself = useRef(null);

  useEffect(() => {
    map.current = window.L.map("map").setView([24, 121], 5);

    window.L.tileLayer(
      "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map.current);

    // window.L.tileLayer(
    //   `https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_LEAFLET_KEY}`,
    //   {}
    // ).addTo(map.current);

    // map.current.attributionControl.addAttribution(
    //   '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors'
    // );

    map.current.locate({
      // setView: true, // 是否讓地圖跟著移動中心點
      watch: true, // 是否要一直監測使用者位置
      maxZoom: 18, // 最大的縮放值
      enableHighAccuracy: true, // 是否要高精準度的抓位置
      timeout: 10000, // 觸發locationerror事件之前等待的毫秒數
    });

    const geoConfirmHandler = (e) => {
      if (!init.current) {
        map.current.setView(e.latlng, 18);
      }
      init.current = true;

      if (myself.current) {
        map.current.removeLayer(myself.current);
        // console.log("remove");
      }

      myself.current = window.L.marker(e.latlng, { icon: myselfMarker });
      myself.current.addTo(map.current);

      // console.log(e);
    };

    const geoDenyHandler = () => {
      init.current = true;
      map.current.setView([25.037850742582183, 121.54882907867433], 18);
      myself.current = window.L.marker([
        25.037850742582183, 121.54882907867433,
      ]);
      myself.current.addTo(map.current);
    };

    map.current.on("locationfound", geoConfirmHandler);
    map.current.on("locationerror", geoDenyHandler);

    return () => {
      console.log("off");
      map.current.off();
    };
  }, []);

  return <></>;
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
