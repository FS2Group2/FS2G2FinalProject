import {
  SET_ACCOMMODATIONS,
  SET_LOAD_ACCOMMODATION_ERROR,
  SET_LOAD_ACCOMMODATION_PENDING,
  SET_LOAD_ACCOMMODATION_SUCCESS
} from "./actionsTypes";
import dataMap from "../constants/ApiSettings";
import {fetchData} from "../components/fetchData";

export function setAccommodationPending(isAccommodationPending) {
  return {
    type: SET_LOAD_ACCOMMODATION_PENDING,
    payload: isAccommodationPending
  };
}

export function setAccommodationSuccess(isAccommodationSuccess) {
  return{
    type: SET_LOAD_ACCOMMODATION_SUCCESS,
    payload: isAccommodationSuccess
  };
}

export function setLoadAccommodationError(loadAccommodationError) {
  return{
    type: SET_LOAD_ACCOMMODATION_ERROR, payload: loadAccommodationError
  }
}

export function setAccommodations(accommodationsData) {
  return{
    type: SET_ACCOMMODATIONS, payload: accommodationsData
  }
}

export function loadAccommodations(cityName) {
  return dispatch => {
    dispatch(setAccommodationPending(true));
    dispatch(setAccommodationSuccess(false));
    dispatch(setLoadAccommodationError(null));
    let responseStatus = false;

    let apiUrl=dataMap.accommodations+cityName;
    fetchData(apiUrl, 'post', '')
      .then(response => {
        dispatch(setAccommodationPending(false));
        responseStatus = response.ok;
        return response;
      })
      .then(response => response.json())
      .then(json => {
        if (responseStatus) {
          dispatch(setAccommodations(json));
          dispatch(setAccommodationSuccess(true));
        } else {
          dispatch(setLoadAccommodationError(json))
        }
      })
  }
}