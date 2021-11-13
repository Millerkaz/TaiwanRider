import React, { useState } from "react";

import "./select.scss";

const Select = (props) => {
  // const [value, setValue] = useState(props.default || null);

  if (props.style === "custom") {
    return <select className={props.className || ""}>{props.children}</select>;
  }

  return (
    <select className={props.className || ""} {...props.input}>
      <option value="Taichung">臺中市</option>
      <option value="HsinchuCounty">新竹縣</option>
      <option value="MiaoliCounty">苗栗縣</option>
      <option value="NewTaipei">新北市</option>
      <option value="PingtungCounty">屏東縣</option>
      <option value="KinmenCounty">金門縣</option>
      <option value="Taoyuan">桃園市</option>
      <option value="Taipei">臺北市</option>
      <option value="Kaohsiung">高雄市</option>
      <option value="Tainan">臺南市</option>
      <option value="ChiayiCounty">嘉義市</option>
    </select>
  );
};
export default Select;

// const Select = (props) => {
//   console.log(props);
//   const [value, setValue] = useState(props.default || null);

//   if (props.style === "custom") {
//     return <select className={props.className || ""}>{props.children}</select>;
//   }

//   return (
//     <select
//       className={props.className || ""}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     >
//       <option value="Taichung">臺中市</option>
//       <option value="HsinchuCounty">新竹縣</option>
//       <option value="MiaoliCounty">苗栗縣</option>
//       <option value="NewTaipei">新北市</option>
//       <option value="PingtungCounty">屏東縣</option>
//       <option value="KinmenCounty">金門縣</option>
//       <option value="Taoyuan">桃園市</option>
//       <option value="Taipei">臺北市</option>
//       <option value="Kaohsiung">高雄市</option>
//       <option value="Tainan">臺南市</option>
//       <option value="ChiayiCounty">嘉義市</option>
//     </select>
//   );
// };
