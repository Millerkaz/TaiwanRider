import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import history from "../../helper/history";

import { useDispatch } from "react-redux";
import { action } from "../../store";

import Input from "../form/input/input";
import Select from "../form/select/select";
import Btn from "../../components/btn";

import img from "../../img";

import "./searchBar.scss";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("spot");
  const [city, setCity] = useState("all");
  const dispatch = useDispatch();

  const formSubmitHandler = (valueObj) => {
    dispatch(action.fetchBikeDataCreator(valueObj));
  };

  return (
    <div className={`searchBar ${props.className || ""}`}>
      <div className="searchBar__container">
        <form
          className="searchBar__form"
          onSubmit={props.handleSubmit((e) => {
            formSubmitHandler(e, type);
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

          {/* <Btn type="submit" color="search">
            搜尋
            <img src={img.search} alt="search" />
          </Btn> */}
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
