import {
  ADD_TO_PURCHASES,
  ADD_TO_WISHLIST,
  FILL_CATEGORIES_LIST,
  FILL_CITIES_LIST, FILL_LANGUAGES_LIST,
  LOAD_EVENT_INFO,
  LOAD_EVENTS,
  LOAD_TOP_EVENTS,
  LOAD_TRANSFERS_BACKWARD,
  LOAD_TRANSFERS_FORWARD,
  LOAD_WISHLIST, REMOVE_FROM_WISHLIST, SET_EVENT_INFO_ERROR, SET_EVENT_INFO_PENDING, SET_EVENT_INFO_SUCCESS,
  SET_FETCH_ERROR,
  SET_FETCH_PENDING,
  SET_FETCH_SUCCESS,
  USER_LOGIN
} from "./actionsTypes";
import {fetchData} from "../components/fetchData";
import dataMap from "../constants/ApiSettings";

export function setFetchPending(isFetchPending) {
  return {
    type: SET_FETCH_PENDING,
    payload: isFetchPending
  };
}

export function setFetchSuccess(isFetchSuccess) {
  return {
    type: SET_FETCH_SUCCESS,
    payload: isFetchSuccess
  };
}

export function setFetchError(fetchError) {
  return {
    type: SET_FETCH_ERROR,
    payload: fetchError
  }
}

export function fetchDataFromApi(queryType, query) {
  let {apiUrl, method, dataType} = queryType;
  if(method.toLowerCase()==='get' && query){
    apiUrl=apiUrl+query.toString()
  }
  return dispatch => {
    dispatch(setFetchPending(true));
    dispatch(setFetchSuccess(false));
    dispatch(setFetchError(null));
    let responseStatus = false;
    fetchData(apiUrl, method, query)
      .then(response => {
        dispatch(setFetchPending(false));
        responseStatus = response.ok;
        return response;
      })
      .then(response => response.json())
      .then(json => {
        if (responseStatus) {
          dispatch(setFetchSuccess(true));
          dispatch(setFetchData(json, dataType))
        } else {
          dispatch(setFetchError(json))
        }
      })
  }
}

export function setFetchData(fetchData, dataType) {
  switch (dataType) {
    case 'ALL_CITIES_LIST':
      return {
        type: FILL_CITIES_LIST,
        payload: fetchData
      };

    case 'ALL_CATEGORIES_LIST':
      return {
        type: FILL_CATEGORIES_LIST,
        payload: fetchData
      };
    case 'LANGUAGES_LIST':
      return{
        type: FILL_LANGUAGES_LIST,
        payload: fetchData
      };
    case 'TOP_EVENTS':
      return{
        type: LOAD_TOP_EVENTS,
        payload: fetchData
      };

    case 'LOAD_WISH_LIST':
      return {
        type: LOAD_WISHLIST,
        payload: fetchData
      };

    case 'ADD_TO_WISH_LIST':
      return{
        type: ADD_TO_WISHLIST,
        payload: fetchData
      };

    case 'REMOVE_FROM_WISH_LIST':
      return{
        type: REMOVE_FROM_WISHLIST,
        payload: fetchData
      };

    case 'ADD_PURCHASE':
      return{
        type: ADD_TO_PURCHASES,
        payload: fetchData
      };

    case 'LOAD_USER':
      return {
        type: USER_LOGIN,
        payload: fetchData
      };

    case 'LOAD_EVENTS':
      return {
        type: LOAD_EVENTS,
        payload: fetchData
      };

    case 'EVENT_INFO':
      return{
      type: LOAD_EVENT_INFO,
      payload: fetchData
      };

    case 'TRANSFERS_FORWARD':
      return{
        type: LOAD_TRANSFERS_FORWARD,
        payload: fetchData
      };

    case 'TRANSFERS_BACKWARD':
      return{
        type: LOAD_TRANSFERS_BACKWARD,
        payload: fetchData
      };

    default:
      return {
        type: SET_FETCH_ERROR
      }
  }

}

export function setEventInfoPending(isEventInfoPending) {
  return {
    type: SET_EVENT_INFO_PENDING,
    payload: isEventInfoPending
  };
}

export function setEventInfoSuccess(isEventInfoSuccess) {
  return {
    type: SET_EVENT_INFO_SUCCESS,
    payload: isEventInfoSuccess
  };
}

export function setEventInfoError(eventInfoError) {
  return {
    type: SET_EVENT_INFO_ERROR,
    payload: eventInfoError
  }
}

export function setEventInfoData(fetchData) {
  return{
    type: LOAD_EVENT_INFO,
    payload: fetchData
  }
}

export function fetchEventInfo(eventId) {
    return dispatch => {
    dispatch(setEventInfoPending(true));
    dispatch(setEventInfoSuccess(false));
    dispatch(setEventInfoError(null));
    let responseStatus = false;

    let apiUrl=dataMap.event+eventId;
    fetchData(apiUrl, 'get', '')
      .then(response => {
        dispatch(setEventInfoPending(false));
        responseStatus = response.ok;
        return response;
      })
      .then(response => response.json())
      .then(json => {
        if (responseStatus) {
          dispatch(setEventInfoData(json));
          dispatch(setEventInfoSuccess(true));
        } else {
          dispatch(setEventInfoError(json))
        }
      })
  }
}