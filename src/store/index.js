import { PTX } from "../API";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

//*---------------- type ---------------- *//

const FETCH_BIKE_DATA = "FETCH_BIKE_DATA";
const FETCH_NO_BIKE_DATA = "FETCH_NO_BIKE_DATA";

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
        });
        return;
      }

      const UIDPromiseArray = bikeData.data.map((station) =>
        PTX.get(
          `/v2/Bike/Availability/${city}?$filter=StationUID%20eq%20'${station.StationUID}'&$top=1&$format=JSON`
        )
      );

      const bikeAvailableData = await Promise.all(UIDPromiseArray);

      dispatch({
        type: FETCH_BIKE_DATA,
        payload: {
          bikeData: bikeData.data,
          bikeAvailableData: bikeAvailableData.map((v) => v.data),
        },
      });
    };
  },

  closeErrorScreenCreator: () => {
    return { type: CLOSE_ERROR_SCREEN };
  },
};

//*---------------- Reducer ---------------- *//

const oneBikeDataReducer = (preState = {}, action) => {
  if (action.type === FETCH_BIKE_DATA) {
    return { ...preState, ...action.payload };
  }

  return preState;
};

const isErrorShowReducer = (preState = false, action) => {
  if (action.type === FETCH_NO_BIKE_DATA) {
    return true;
  }
  if (action.type === CLOSE_ERROR_SCREEN) {
    return false;
  }

  return preState;
};

export const reducers = combineReducers({
  bikeData: oneBikeDataReducer,
  isErrorShow: isErrorShowReducer,
  form: formReducer,
});
