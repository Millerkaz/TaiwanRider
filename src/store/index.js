import { PTX } from "../API";
import { combineReducers } from "redux";

//*---------------- type ---------------- *//

const FETCH_ONE_BUS_DATA = "FETCH_ONE_BUS_DATA";
const FETCH_ROUTE_BUS_DATA = "FETCH_ROUTE_BUS_DATA";

const POP_SHOW = "POP_SHOW";
const POP_HIDE = "POP_HIDE";

const FORM_SEARCH_SUBMIT = "FORM_SEARCH_SUBMIT";

const FETCH_HOMEPAGE_DATA = "FETCH_HOMEPAGE_DATA";

// const PAGE_BAR_NUMBER_CHANGE = "PAGE_BAR_NUMBER_CHANGE";

//*---------------- Action ---------------- *//
export const action = {
  fetchOneBusData: (area, busNumber) => {
    return async (dispatch) => {
      const responseBusNow = await PTX.get(
        `/v2/Bus/RealTimeNearStop/City/${area}/${busNumber}`
      );

      dispatch({ type: FETCH_ONE_BUS_DATA, payload: responseBusNow.data });
    };
  },

  fetchRouteBusData: (area, busNumber) => {
    return async (dispatch) => {
      const responseAllRouteName = await PTX.get(
        `/v2/Bus/DisplayStopOfRoute/City/${area}/${busNumber}`
      );

      const go = responseAllRouteName.data[0].Stops.map((stop) => {
        return {
          UID: stop.StopUID,
          chName: stop.StopName.Zh_tw,
          enName: stop.StopName,
          lon: stop.StopPosition.PositionLon,
          lat: stop.StopPosition.PositionLat,
        };
      });

      const back = responseAllRouteName.data[1].Stops.map((stop) => {
        return {
          UID: stop.StopUID,
          chName: stop.StopName.Zh_tw,
          enName: stop.StopName,
          lon: stop.StopPosition.PositionLon,
          lat: stop.StopPosition.PositionLat,
        };
      });

      dispatch({
        type: FETCH_ROUTE_BUS_DATA,
        payload: { area, busNumber, go, back },
      });
    };
  },

  //-----------------------------------------//

  popWindowShowCreator: (component) => {
    return {
      type: POP_SHOW,
      payload: component,
    };
  },

  popWindowHideCreator: () => {
    return {
      type: POP_HIDE,
      payload: null,
    };
  },

  //-----------------------------------------//
  //get search data

  formSearchSubmitCreator: () => {
    return { type: FORM_SEARCH_SUBMIT, payload: "can't find" };
  },

  //-----------------------------------------//

  fetchHomepageDataCreator: (coords = null) => {
    return async (dispatch) => {
      const filterString = !coords
        ? ""
        : `$spatialFilter=nearby(${coords.lat}%2C${coords.lon}%2C10000)&$`;

      const spotPrise = PTX.get(
        `/v2/Tourism/ScenicSpot?$top=6&${filterString}format=JSON`
      );

      const activityPromise = PTX.get(
        `/v2/Tourism/Activity?$top=3&${filterString}format=JSON`
      );

      const restaurantPromise = PTX.get(
        `/v2/Tourism/Restaurant?$top=6&${filterString}format=JSON`
      );

      const AllData = await Promise.all([
        spotPrise,
        activityPromise,
        restaurantPromise,
      ]);

      dispatch({
        type: FETCH_HOMEPAGE_DATA,
        payload: {
          spot: AllData[0].data,
          activity: AllData[1].data,
          restaurant: AllData[2].data,
        },
      });
    };
  },
  // pageBarNumberChangeCreator: page => {
  //   return {
  //     type: PAGE_BAR_NUMBER_CHANGE,
  //     payload: page,
  //   };
  // },
};

//*---------------- Reducer ---------------- *//

const oneBusDataReducer = (preState = {}, action) => {
  if (action.type === FETCH_ONE_BUS_DATA) {
    let bus = action.payload.busNumber;
    return { ...preState, [bus]: action.payload.data };
  }
  return preState;
};

const fullBusRouteReducer = (preState = {}, action) => {
  if (action.type === FETCH_ROUTE_BUS_DATA) {
    return { ...preState, ...action.payload };
  }
  return preState;
};

const popWindowReducer = (
  preState = { show: false, component: null },
  action
) => {
  switch (action.type) {
    case POP_SHOW:
      return { ...preState, show: true, component: action.payload };

    case POP_HIDE:
      return { ...preState, show: false, component: null };

    default:
      return preState;
  }
};

const formSearchSubmitReducer = (preState = null, action) => {
  switch (action.type) {
    case FORM_SEARCH_SUBMIT:
      return { ...action.payload };

    default:
      return preState;
  }
};

const homepageDataReducer = (preState = null, action) => {
  if (action.type === FETCH_HOMEPAGE_DATA) {
    return { ...action.payload };
  }
  return preState;
};

// const pageBarNumberChange = (preState = 1, action) => {
//   if (action.type === PAGE_BAR_NUMBER_CHANGE) {
//     return action.payload;
//   }
//   return preState;
// };

export const reducers = combineReducers({
  oneBus: oneBusDataReducer,
  fullBusRoute: fullBusRouteReducer,
  popWindow: popWindowReducer,
  searchData: formSearchSubmitReducer,
  homepageData: homepageDataReducer,
  // nowPage: pageBarNumberChange,
});
