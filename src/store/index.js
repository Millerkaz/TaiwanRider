import { PTX } from "../API";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

//*---------------- type ---------------- *//

const FETCH_BIKE_DATA = "FETCH_BIKE_DATA";
const FETCH_NO_BIKE_DATA = "FETCH_NO_BIKE_DATA";

const FETCH_NEAR_BIKE_DATA = "FETCH_NEAR_BIKE_DATA";
const FETCH_NEAR_RESTAURANT_DATA = "FETCH_NEAR_RESTAURANT_DATA";
const CLEAR_NEAR_DATA = "CLEAR_NEAR_DATA";

const SELECT_RESTAURANT = "SELECT_RESTAURANT";
const SELECT_ROAD = "SELECT_ROAD";

const CLOSE_ERROR_SCREEN = "CLOSE_ERROR_SCREEN";

//*---------------- Action ---------------- *//
// const filterString = !coords
//         ? ""
//         : `$spatialFilter=nearby(${coords.lat}%2C${coords.lon}%2C10000)&$`;

export const action = {
  fetchBikeDataCreator: ({ term, city }) => {
    return async (dispatch) => {
      const bikeData = await PTX.get(
        `/v2/Bike/Station/${city}?${
          term && `$filter=contains(StationName%2Fzh_tw%2C'${term}')&`
        }&$top=10&$format=JSON`
      );

      if (bikeData.data.length === 0) {
        dispatch({
          type: FETCH_NO_BIKE_DATA,
          payload: { mes: "no data" },
        });
        return;
      }

      const UIDPromiseArray = bikeData.data.map((station) =>
        PTX.get(
          `/v2/Bike/Availability/${city}?$filter=StationUID%20eq%20'${station.StationUID}'&$top=1&$format=JSON`
        )
      );

      const bikeAvailableData = await Promise.all(UIDPromiseArray);

      // dispatch(action.clearNearDataCreator());

      dispatch({
        type: FETCH_BIKE_DATA,
        payload: {
          bikeData: bikeData.data,
          bikeAvailableData: bikeAvailableData.map((data) => data.data[0]),
        },
      });
    };
  },

  fetchNearBikeDataCreator: ({ lat, lng }) => {
    return async (dispatch, getState) => {
      const bikeData = await PTX.get(
        `/v2/Bike/Station/NearBy?$top=100&$spatialFilter=nearby(${lat}%2C${lng}%2C1000)&$format=JSON`
      );

      if (bikeData.data.length === 0) {
        return;
      }

      const bikeAvailableData = await PTX.get(
        `/v2/Bike/Availability/NearBy?$top=100&$spatialFilter=nearby(${lat}%2C${lng}%2C1000)&$format=JSON`
      );

      dispatch({
        type: FETCH_NEAR_BIKE_DATA,
        payload: {
          bikeData: bikeData.data,
          bikeAvailableData: bikeAvailableData.data,
        },
      });
    };
  },

  fetchRestaurantDataCreator: (coords, meters = 500) => {
    return async (dispatch) => {
      if (!coords) return;
      const filterString = `$spatialFilter=nearby(${coords.lat}%2C${coords.lng}%2C${meters})&$`;

      const restaurantPromise = await PTX.get(
        `/v2/Tourism/Restaurant?$top=100&${filterString}format=JSON`
      );

      dispatch({
        type: FETCH_NEAR_RESTAURANT_DATA,
        payload: restaurantPromise.data,
      });
    };
  },

  selectRestaurantCreator: (id) => {
    return { type: SELECT_RESTAURANT, payload: id };
  },

  selectRoadCreator: (geoJson, props) => {
    return { type: SELECT_ROAD, payload: { ...props, Geometry: geoJson } };
  },

  closeErrorScreenCreator: () => {
    return { type: CLOSE_ERROR_SCREEN };
  },

  clearNearDataCreator: () => {
    return { type: CLEAR_NEAR_DATA };
  },
};

//*---------------- Reducer ---------------- *//

const oneBikeDataReducer = (preState = {}, action) => {
  if (action.type === FETCH_BIKE_DATA) {
    return { ...action.payload };
  }
  return preState;
};

const nearBikeDataReducer = (preState = {}, action) => {
  if (action.type === FETCH_NEAR_BIKE_DATA) {
    return { ...action.payload };
  }

  if (action.type === CLEAR_NEAR_DATA) {
    return null;
  }

  return preState;
};

const fetchRestaurantDataReducer = (preState = null, action) => {
  if (action.type === FETCH_NEAR_RESTAURANT_DATA) {
    return [...action.payload];
  }

  if (action.type === CLEAR_NEAR_DATA) {
    return null;
  }

  return preState;
};

const isErrorShowReducer = (preState = false, action) => {
  if (action.type === FETCH_NO_BIKE_DATA) {
    return { showError: true, ...action.payload };
  }
  if (action.type === CLOSE_ERROR_SCREEN) {
    return { showError: false, mes: "" };
  }

  return preState;
};

const selectRestaurantReducer = (preState = null, action) => {
  if (action.type === SELECT_RESTAURANT) {
    return action.payload;
  }

  return preState;
};

const selectRoadReducer = (preState = null, action) => {
  if (action.type === SELECT_ROAD) {
    return { ...action.payload };
  }

  return preState;
};

export const reducers = combineReducers({
  bikeData: oneBikeDataReducer,
  nearBikeData: nearBikeDataReducer,
  nearRestaurantData: fetchRestaurantDataReducer,
  selectRestaurant: selectRestaurantReducer,
  selectRoad: selectRoadReducer,
  isErrorShow: isErrorShowReducer,
  form: formReducer,
});
