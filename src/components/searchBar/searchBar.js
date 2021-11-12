import React, { useState, useEffect } from "react";
import history from "../../helper/history";

import { useDispatch } from "react-redux";
import Btn from "../../components/btn";

import "./searchBar.scss";

const SearchBar = props => {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("spot");
  const [city, setCity] = useState("all");

  const dispatch = useDispatch();

  const formSubmitHandler = (e, type) => {
    e.preventDefault();
    window.scroll(0, 0);
    history.push(`/${type}/${city}/${term ? term : "all"}/1`);
    setTerm("");
    setCity("all");
  };

  //TODO: 表單必須驗證INPUT有無輸入
  if (props.type === "spot") {
    return (
      <div className={`searchBar ${props.className}`}>
        <div className="searchBar__container">
          <form
            className="searchBar__form"
            onSubmit={e => {
              formSubmitHandler(e, "spot");
            }}
          >
            <input
              type="text"
              placeholder="請輸入景點名稱 ... (陽明山)"
              value={term}
              onChange={e => {
                setTerm(e.target.value);
              }}
            />

            <select
              value={type}
              onChange={e => {
                setType(e.target.value);
              }}
            >
              <option value="spot">景點</option>
            </select>

            <select
              value={city}
              onChange={e => {
                setCity(e.target.value);
              }}
            >
              <option value="all">不分縣市</option>
              <option value="臺北市">臺北市</option>
              <option value="臺中市">臺中市</option>
              <option value="基隆市">基隆市</option>
              <option value="臺南市">臺南市</option>
              <option value="高雄市">高雄市</option>
              <option value="新北市">新北市</option>
              <option value="宜蘭縣">宜蘭縣</option>
              <option value="桃園市">桃園市</option>
              <option value="嘉義市">嘉義市</option>
              <option value="新竹縣">新竹縣</option>
              <option value="苗栗縣">苗栗縣</option>
              <option value="南投縣">南投縣</option>
              <option value="彰化縣">彰化縣</option>
              <option value="新竹市">新竹市</option>
              <option value="雲林縣">雲林縣</option>
              <option value="嘉義縣">嘉義縣</option>
              <option value="屏東縣">屏東縣</option>
              <option value="花蓮縣">花蓮縣</option>
              <option value="臺東縣">臺東縣</option>
              <option value="金門縣">金門縣</option>
              <option value="澎湖縣">澎湖縣</option>
              <option value="連江縣">連江縣</option>
            </select>
            <Btn color="search">搜尋</Btn>
          </form>
        </div>
      </div>
    );
  }

  if (props.type === "activity") {
    return (
      <div className={`searchBar ${props.className}`}>
        <div className="searchBar__container">
          <form
            className="searchBar__form"
            onSubmit={e => {
              formSubmitHandler(e, "activity");
            }}
          >
            <input
              type="text"
              placeholder="請輸入活動名稱 ... (展覽)"
              value={term}
              onChange={e => {
                setTerm(e.target.value);
              }}
            />

            <select
              value={type}
              onChange={e => {
                setType(e.target.value);
              }}
            >
              <option value="activity">活動</option>
            </select>

            <select
              value={city}
              onChange={e => {
                setCity(e.target.value);
              }}
            >
              <option value="all">不分縣市</option>
              <option value="臺北市">臺北市</option>
              <option value="臺中市">臺中市</option>
              <option value="基隆市">基隆市</option>
              <option value="臺南市">臺南市</option>
              <option value="高雄市">高雄市</option>
              <option value="新北市">新北市</option>
              <option value="宜蘭縣">宜蘭縣</option>
              <option value="桃園市">桃園市</option>
              <option value="嘉義市">嘉義市</option>
              <option value="新竹縣">新竹縣</option>
              <option value="苗栗縣">苗栗縣</option>
              <option value="南投縣">南投縣</option>
              <option value="彰化縣">彰化縣</option>
              <option value="新竹市">新竹市</option>
              <option value="雲林縣">雲林縣</option>
              <option value="嘉義縣">嘉義縣</option>
              <option value="屏東縣">屏東縣</option>
              <option value="花蓮縣">花蓮縣</option>
              <option value="臺東縣">臺東縣</option>
              <option value="金門縣">金門縣</option>
              <option value="澎湖縣">澎湖縣</option>
              <option value="連江縣">連江縣</option>
            </select>
            <Btn color="search">搜尋</Btn>
          </form>
        </div>
      </div>
    );
  }

  if (props.type === "restaurant") {
    return (
      <div className={`searchBar ${props.className}`}>
        <div className="searchBar__container">
          <form
            className="searchBar__form"
            onSubmit={e => {
              formSubmitHandler(e, "restaurant");
            }}
          >
            <input
              type="text"
              placeholder="請輸入餐廳名稱 ... (海鮮)"
              value={term}
              onChange={e => {
                setTerm(e.target.value);
              }}
            />

            <select
              value={type}
              onChange={e => {
                setType(e.target.value);
              }}
            >
              <option value="restaurant">餐廳</option>
            </select>

            <select
              value={city}
              onChange={e => {
                setCity(e.target.value);
              }}
            >
              <option value="all">不分縣市</option>
              <option value="臺北市">臺北市</option>
              <option value="臺中市">臺中市</option>
              <option value="基隆市">基隆市</option>
              <option value="臺南市">臺南市</option>
              <option value="高雄市">高雄市</option>
              <option value="新北市">新北市</option>
              <option value="宜蘭縣">宜蘭縣</option>
              <option value="桃園市">桃園市</option>
              <option value="嘉義市">嘉義市</option>
              <option value="新竹縣">新竹縣</option>
              <option value="苗栗縣">苗栗縣</option>
              <option value="南投縣">南投縣</option>
              <option value="彰化縣">彰化縣</option>
              <option value="新竹市">新竹市</option>
              <option value="雲林縣">雲林縣</option>
              <option value="嘉義縣">嘉義縣</option>
              <option value="屏東縣">屏東縣</option>
              <option value="花蓮縣">花蓮縣</option>
              <option value="臺東縣">臺東縣</option>
              <option value="金門縣">金門縣</option>
              <option value="澎湖縣">澎湖縣</option>
              <option value="連江縣">連江縣</option>
            </select>
            <Btn color="search">搜尋</Btn>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`searchBar ${props.className}`}>
      <div className="searchBar__container">
        <form
          className="searchBar__form"
          onSubmit={e => {
            formSubmitHandler(e, type);
          }}
        >
          <input
            type="text"
            placeholder="請輸入景點/活動/餐廳..."
            value={term}
            onChange={e => {
              setTerm(e.target.value);
            }}
          />
          <div class="custom-select">
            <select
              value={type}
              onChange={e => {
                setType(e.target.value);
              }}
            >
              <option value="spot">景點</option>
              <option value="activity">活動</option>
              <option value="restaurant">餐廳</option>
            </select>
          </div>

          <select
            value={city}
            onChange={e => {
              setCity(e.target.value);
            }}
          >
            <option value="all">不分縣市</option>
            <option value="臺北市">臺北市</option>
            <option value="臺中市">臺中市</option>
            <option value="基隆市">基隆市</option>
            <option value="臺南市">臺南市</option>
            <option value="高雄市">高雄市</option>
            <option value="新北市">新北市</option>
            <option value="宜蘭縣">宜蘭縣</option>
            <option value="桃園市">桃園市</option>
            <option value="嘉義市">嘉義市</option>
            <option value="新竹縣">新竹縣</option>
            <option value="苗栗縣">苗栗縣</option>
            <option value="南投縣">南投縣</option>
            <option value="彰化縣">彰化縣</option>
            <option value="新竹市">新竹市</option>
            <option value="雲林縣">雲林縣</option>
            <option value="嘉義縣">嘉義縣</option>
            <option value="屏東縣">屏東縣</option>
            <option value="花蓮縣">花蓮縣</option>
            <option value="臺東縣">臺東縣</option>
            <option value="金門縣">金門縣</option>
            <option value="澎湖縣">澎湖縣</option>
            <option value="連江縣">連江縣</option>
          </select>
          <Btn color="search">搜尋</Btn>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
