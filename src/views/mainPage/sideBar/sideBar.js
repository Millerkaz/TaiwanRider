import React, { useState, useMemo } from "react";
import Btn from "../../../components/btn";
import { useDispatch, useSelector } from "react-redux";
import { city } from "../../../helper";

import SideBarListCard from "../../../components/card/sideBarListCard/sideBarListCard";

import "./sideBar.scss";
import { action } from "../../../store";

const renderTown = (v) => {
  if (v === "all") return;

  return city[v][1].map((name) => <option value={name}>{name}</option>);
};

const SideBar = (props) => {
  const roadData = useSelector((state) => state.roadData);
  const [value, setValue] = useState("Taipei");
  const [town, setTown] = useState("all");
  const dispatch = useDispatch();

  const renderRoadData = useMemo(() => {
    return ((roadData) => {
      if (!roadData || roadData.length === 0) return;

      return roadData.map((obj) => <SideBarListCard {...obj} />);
    })(roadData);
  }, [roadData]);

  return (
    <React.Fragment>
      <div className="mainPage__sideBar-header">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(action.fetchRoadDataCreator(value, town));
          }}
        >
          <div>
            <label>請選擇城市：</label>
            <select
              className="select "
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <option value="Taipei">臺北市</option>
              <option value="Taichung">臺中市</option>
              <option value="Keelung">基隆市</option>
              <option value="Tainan">臺南市</option>
              <option value="Kaohsiung">高雄市</option>
              <option value="NewTaipei">新北市</option>
              <option value="YilanCounty">宜蘭縣</option>
              <option value="Taoyuan">桃園市</option>
              <option value="Chiayi">嘉義市</option>
              <option value="HsinchuCounty">新竹縣</option>
              <option value="MiaoliCounty">苗栗縣</option>
              <option value="NantouCounty">南投縣</option>
              <option value="ChanghuaCounty">彰化縣</option>
              <option value="Hsinchu">新竹市</option>
              <option value="YunlinCounty">雲林縣</option>
              <option value="ChiayiCounty">嘉義縣</option>
              <option value="PingtungCounty">屏東縣</option>
              <option value="HualienCounty">花蓮縣</option>
              <option value="TaitungCounty">臺東縣</option>
              <option value="KinmenCounty">金門縣</option>
              <option value="PenghuCounty">澎湖縣</option>
              <option value="LienchiangCounty">連江縣</option>
            </select>
          </div>
          <div>
            <label>請選擇鄉鎮市區：</label>
            <select
              value={town}
              onChange={(e) => {
                console.log(e.target.value);
                setTown(e.target.value);
              }}
              className="select"
            >
              <option value="all">不分縣市</option>
              {renderTown(value)}
            </select>
          </div>
          <Btn color="" type="submit">
            搜尋
          </Btn>
        </form>
      </div>
      <div className="mainPage__sideBar-list">{renderRoadData}</div>
    </React.Fragment>
  );
};

export default SideBar;
