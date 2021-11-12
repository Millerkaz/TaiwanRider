import history from "./history";

// const { city, term, page } = props.hash;
// const push = history.push(`/spot/${city}/${term}/${page}/${props.id}`);

export const city = {
  臺北市: "Taipei",
  臺中市: "Taichung",
  基隆市: "Keelung",
  臺南市: "Tainan",
  高雄市: "Kaohsiung",
  新北市: "NewTaipei",
  宜蘭縣: "YilanCounty",
  桃園市: "Taoyuan",
  嘉義市: "Chiayi",
  新竹縣: "HsinchuCounty",
  苗栗縣: "MiaoliCounty",
  南投縣: "NantouCounty",
  彰化縣: "ChanghuaCounty",
  新竹市: "Hsinchu",
  雲林縣: "YunlinCounty",
  嘉義縣: "ChiayiCounty",
  屏東縣: "PingtungCounty",
  花蓮縣: "HualienCounty",
  臺東縣: "TaitungCounty",
  金門縣: "KinmenCounty",
  澎湖縣: "PenghuCounty",
  連江縣: "LienchiangCounty",
};

export const pageCalcHelper = responseDataArray => {
  const cardPerPage = 12;
  let page = responseDataArray.length % cardPerPage === 0 ? responseDataArray.length / cardPerPage : responseDataArray.length / cardPerPage + 1;

  // console.log(responseDataArray.length % cardPerPage === 0, responseDataArray.length / cardPerPage, page);

  let dataForPageObj = {};
  for (let i = 1; i <= page; i++) {
    //62筆 = 0~19 20~39 40~59 60~62
    dataForPageObj[i] = responseDataArray.slice((i - 1) * cardPerPage, i * cardPerPage);
  }

  // console.log(dataForPageObj);
  return dataForPageObj;
};

export const historyPush = path => {
  window.scroll(0, 0);
  history.push(path);
};
