import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../btn";
import history from "../../helper/history";
import "./pageBtnBar.scss";

const PageBtnBar = props => {
  const dispatch = useDispatch();
  const btnCountPerRow = 5;
  const totalPageArray = useSelector(state => state.searchData?.totalPage);
  const { city, term, page } = props.hash;

  const renderBtnBar = () => {
    if (!totalPageArray || totalPageArray.length === 0) {
      return "";
    }

    const numberBtn = () => {
      let pageBarNumber = page % btnCountPerRow === 0 ? page / btnCountPerRow : Number.parseInt(page / btnCountPerRow) + 1;
      let nowBar = totalPageArray.slice((pageBarNumber - 1) * btnCountPerRow, pageBarNumber * btnCountPerRow);
      return nowBar.map(number => {
        return (
          <Btn
            key={number}
            color="pageBar"
            onClick={() => {
              window.scroll(0, 0);
              history.push(`/${props.type}/${city}/${term}/${Number(number)}`);
            }}
            className={page === number ? "btn--active" : ""}
          >
            {number}
          </Btn>
        );
      });
    };

    return (
      <React.Fragment>
        {Number(page) === 1 ? (
          ""
        ) : (
          <Btn
            color="pageBar"
            onClick={() => {
              window.scroll(0, 0);
              history.push(`/${props.type}/${city}/${term}/${Number(page) - 1}`);
            }}
          >
            {"<"}
          </Btn>
        )}
        {numberBtn()}
        {totalPageArray.length === 1 || Number(page) === totalPageArray.length ? (
          ""
        ) : (
          <Btn
            color="pageBar"
            onClick={() => {
              window.scroll(0, 0);
              history.push(`/${props.type}/${city}/${term}/${Number(page) + 1}`);
            }}
          >
            {">"}
          </Btn>
        )}
      </React.Fragment>
    );
  };

  return <div className={props.className}>{renderBtnBar()}</div>;
};

export default PageBtnBar;
