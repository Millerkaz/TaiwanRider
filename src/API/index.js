import axios from "axios";
import jsSHA from "jssha";

export const PTX = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC",
  headers: GetAuthorizationHeader(),
});

function GetAuthorizationHeader() {
  var AppID = process.env.REACT_APP_PTX_ID;
  var AppKey = process.env.REACT_APP_PTX_KEY;

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  var HMAC = ShaObj.getHMAC("B64");
  var Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';

  return {
    Authorization: Authorization,
    "X-Date": GMTString,
    "Accept-Encoding": "gzip",
  };
}
