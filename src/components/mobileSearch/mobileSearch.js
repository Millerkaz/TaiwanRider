import React, { useState, useEffect, useRef } from "react";
import { reduxForm, Field } from "redux-form";
import history from "../../helper/history";
import { connect } from "react-redux";

import { useDispatch, useSelector } from "react-redux";
import { action } from "../../store";
import Input from "../form/input/input";
import Select from "../form/select/select";
import Btn from "../btn";

import img from "../../img";

import "./mobileSearch.scss";

const MobileSearchBar = (props) => {
  const nearRestaurantData = useSelector((state) => state.nearRestaurantData);
  const nearBikeData = useSelector((state) => state.nearBikeData);
  const dispatch = useDispatch();
  const mapCenter = useRef(1);
  // console.log(props);

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
            className={`select ${props.selectClass || ""}`}
          />
          <Field
            name="term"
            component={Input}
            className={`input ${props.inputClass || ""}`}
            placeholder="請輸入站點名稱"
          />

          <Field component={Btn} type="submit" color="">
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
  form: "mobileSearchBar",
  initialValues: { city: "Taichung" },
  validate: validate,
})(MobileSearchBar);
