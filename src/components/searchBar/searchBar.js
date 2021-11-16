import React, { useState, useEffect, useRef } from "react";
import { reduxForm, Field } from "redux-form";
import history from "../../helper/history";

import { useDispatch, useSelector } from "react-redux";
import { action } from "../../store";
import { map, myselfPosition } from "../leafletMap/leafletMap";
import { listenMyselfPosition } from "../leafletMap/leafletMap";

import Input from "../form/input/input";
import Select from "../form/select/select";
import Btn from "../../components/btn";

import img from "../../img";

import "./searchBar.scss";

const SearchBar = (props) => {
  const nearRestaurantData = useSelector((state) => state.nearRestaurantData);
  const nearBikeData = useSelector((state) => state.nearBikeData);
  const dispatch = useDispatch();
  const mapCenter = useRef(1);

  const formSubmitHandler = (valueObj) => {
    dispatch(action.clearNearDataCreator());
    dispatch(action.fetchBikeDataCreator(valueObj));
  };

  return (
    <div className={`searchBar ${props.className || ""}`}>
      <div className="searchBar__container">
        <form
          className="searchBar__form"
          onSubmit={props.handleSubmit((valueObj) => {
            formSubmitHandler(valueObj);
          })}
        >
          <Field
            name="city"
            component={Select}
            className="select select__mainSearchBar"
          />
          <Field
            name="term"
            component={Input}
            className="input input__mainSearchBar"
            placeholder="請輸入站點名稱"
          />

          <Field component={Btn} type="submit" color="search">
            搜尋
            <img src={img.search} alt="search" />
          </Field>
        </form>
      </div>
    </div>
  );
};

const validate = (formValues) => {
  const error = {};

  if (!formValues.term) {
    error.term = "請輸入站點關鍵字";
  }

  return error;
};

export default reduxForm({
  form: "searchBar",
  initialValues: { city: "Taichung" },
  validate: validate,
})(SearchBar);
