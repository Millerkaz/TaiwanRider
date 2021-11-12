import React, { useState, useEffect } from "react";
import LeafletMap from "../../leafletMap/leafletMap";
import Btn from "../../btn";
import { PTX } from "../../../API";

import "./detailCard.scss";
import marker_icon from "../../../img/Marker.png";
import clock_icon from "../../../img/icon/Clock.png";
import info_icon from "../../../img/icon/Info.png";
import dollar_icon from "../../../img/icon/US Dollar.png";
import spot404_img from "../../../img/spotImg404.png";
import activity404_img from "../../../img/activity404.png";
import restaurant_img from "../../../img/restaurant404.png";

import SearchList from "../../searchList/searchList";
import { historyPush } from "../../../helper";

const showErrorImg = function (props, e = null) {
  if (e === null) {
    e = { target: { src: null } };
  }

  switch (props.type) {
    case "activity":
      e.target.src = activity404_img;
      return activity404_img;
    case "restaurant":
      e.target.src = restaurant_img;
      return restaurant_img;
    default:
      e.target.src = spot404_img;
      return spot404_img;
  }
};

const imgBtnClickHandler = e => {
  const imgs = document.querySelectorAll(".detailCard__imgShow--each");
  [...imgs].forEach(element => {
    element.classList.add("img--hidden");
  });
  document.querySelector(`.detailCard__imgShow--${e.target.textContent}`).classList.remove("img--hidden");

  const btns = document.querySelectorAll(".detailCard__imgShow--btn");
  [...btns].forEach(element => {
    element.classList.remove("btn--active");
  });
  e.target.classList.add("btn--active");
};

const renderDetail = (data, nearData, props) => {
  if (!nearData) return;
  let imgCount = Object.keys(data.Picture).length;
  let imgArray = [];
  if (imgCount <= 2) {
    imgArray.push({ url: data.Picture[`PictureUrl${1}`], alt: data.Picture[`PictureDescription${1}`] });
  }
  if (imgCount > 2) {
    for (let i = 1; i <= imgCount / 2; i++) {
      imgArray.push({ url: data.Picture[`PictureUrl${i}`], alt: data.Picture[`PictureDescription${i}`] });
    }
  }

  return (
    <div>
      <div className="detailCard">
        <div className="detailCard__imgShow">
          {imgArray.length > 1 && (
            <div className="detailCard__imgShow--Bar">
              {imgArray.map((v, i) => (
                <Btn
                  className={`detailCard__imgShow--btn ${i + 1 === 1 ? "btn--active" : ""}`}
                  color="pageBar"
                  onClick={e => {
                    imgBtnClickHandler(e);
                  }}
                >
                  {i + 1}
                </Btn>
              ))}
            </div>
          )}
          <div className="detailCard__imgShow--List">
            {imgArray.map((imgObj, i) => (
              <div className={`detailCard__imgShow--each detailCard__imgShow--${i + 1} ${i + 1 !== 1 ? "img--hidden" : ""}`}>
                <img onError={e => showErrorImg(props, e)} src={imgObj.url ? imgObj.url : showErrorImg(props)} alt={imgObj.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="detailCard__header">
          <div className="detailCard__header--title">{data.Name}</div>
          <div className="detailCard__header--class">
            <span>
              <img src={marker_icon} alt="marker" />
              {data.City || data.Address?.slice(0, 3) || data.Organizer}
            </span>
            {data.Class1 ? <span>{data.Class1}</span> : ""}
            {data.Class2 ? <span>{data.Class2}</span> : ""}
            {data.Class3 ? <span>{data.Class3}</span> : ""}
            {data.Class4 ? <span>{data.Class4}</span> : ""}
            {data.Level ? <span>{data.Level}</span> : ""}
          </div>
        </div>

        <div className="detailCard__iconGrid">
          <div className="detailCard__iconGrid--left">
            {data.OpenTime && (
              <div className="detailCard__iconGrid--openTime">
                <img src={clock_icon} />
                {data.OpenTime}
              </div>
            )}
            <div className="detailCard__iconGrid--ticketInfo">
              <img src={dollar_icon} />
              {!data.TicketInfo ? "免費" : data.TicketInfo}
            </div>

            {data.TravelInfo && (
              <div className="detailCard__iconGrid--travelInfo">
                <img src={info_icon} />
                {data.TravelInfo}
              </div>
            )}
            {data.Organizer && (
              <div className="detailCard__iconGrid--remarks">
                <img src={info_icon} />
                {data.Organizer}
              </div>
            )}
            {data.Remarks && (
              <div className="detailCard__iconGrid--remarks">
                <img src={info_icon} />
                {data.Remarks}
              </div>
            )}

            {data.Address && (
              <div className="detailCard__iconGrid--address">
                <img src={marker_icon} alt="marker" style={{ width: "3rem", height: "3rem" }} />
                {data.Address}
              </div>
            )}
            {data.Location && (
              <div className="detailCard__iconGrid--address">
                <img src={marker_icon} alt="marker" style={{ width: "3rem", height: "3rem" }} />
                {data.Location}
              </div>
            )}
            <div className="detailCard__iconGrid--link">
              {data.Phone && (
                <Btn type="anchor" color="detailCard" href={`tel:+${data.Phone}`}>
                  {data.Phone}
                </Btn>
              )}
              {data.WebsiteUrl && (
                <Btn type="anchor" color="search" href={`${data.WebsiteUrl}`} blank={true}>
                  官方網站
                </Btn>
              )}
            </div>
          </div>

          <LeafletMap className="detailCard__iconGrid--map" name={data.Name} location={{ lat: data.Position.PositionLat, lon: data.Position.PositionLon }} />
        </div>

        <div className="detailCard__description">
          {data.Description && <p>{data.Description}</p>}
          {data.DescriptionDetail && <p>{data.DescriptionDetail}</p>}
        </div>
      </div>
      <div className="detailCard__near detailCard__near--spot">
        <div className="detailCard__near--header">
          <h2>附近景點</h2>
          <Btn
            color="search"
            onClick={() => {
              historyPush(`/spot/${data.City || data.Address?.slice(0, 3)}/all/1`);
            }}
          >{`更多${data.City || data.Address?.slice(0, 3) || data.Organizer}景點`}</Btn>
        </div>
        <SearchList type="spot" data={nearData.spot} />
      </div>
      <div className="detailCard__near detailCard__near--activity">
        <div className="detailCard__near--header">
          <h2>附近美食</h2>
          <Btn
            color="search"
            onClick={() => {
              historyPush(`/restaurant/${data.City || data.Address?.slice(0, 3)}/all/1`);
            }}
          >{`更多${data.City || data.Address?.slice(0, 3) || data.Organizer}美食`}</Btn>
        </div>
        <SearchList type="restaurant" data={nearData.restaurant} />
      </div>
      <div className="detailCard__near detailCard__near--restaurant">
        <div className="detailCard__near--header">
          <h2>附近活動</h2>
          <Btn
            color="search"
            onClick={() => {
              historyPush(`/activity/${data.City || data.Address?.slice(0, 3)}/all/1`);
            }}
          >{`更多${data.City || data.Address?.slice(0, 3) || data.Organizer}活動`}</Btn>
        </div>
        <SearchList type="activity" data={nearData.activity} />
      </div>
    </div>
  );
  // backPath={props.backPath}
};

//從 match 引入ID
const DetailCard = props => {
  const [nearTargetData, setNearTargetData] = useState(null);

  useEffect(() => {
    if (props.data) {
      const fetchData = async () => {
        const filterString = `$spatialFilter=nearby(${props.data.Position.PositionLat}%2C${props.data.Position.PositionLon}%2C10000)&$`;

        const spotPrise = PTX.get(`/v2/Tourism/ScenicSpot?$top=3&${filterString}format=JSON`);

        const activityPromise = PTX.get(`/v2/Tourism/Activity?$top=3&${filterString}format=JSON`);

        const restaurantPromise = PTX.get(`/v2/Tourism/Restaurant?$top=3&${filterString}format=JSON`);

        const AllData = await Promise.all([spotPrise, activityPromise, restaurantPromise]);

        setNearTargetData({ spot: AllData[0].data, activity: AllData[1].data, restaurant: AllData[2].data });
      };

      fetchData();
    }
  }, [props.data]);
  return <React.Fragment>{props.data ? renderDetail(props.data, nearTargetData, props) : <div></div>}</React.Fragment>;
};

export default DetailCard;
