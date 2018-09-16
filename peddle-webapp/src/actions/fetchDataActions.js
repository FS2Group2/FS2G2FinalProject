import {
  FILL_CATEGORIES_LIST,
  FILL_CITIES_LIST, LOAD_EVENTS, LOAD_WISHLIST,
  SET_FETCH_ERROR,
  SET_FETCH_PENDING,
  SET_FETCH_SUCCESS, USER_LOGIN
} from "./actionsTypes";
import {fetchData} from "../components/fetchData";

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
  const {apiUrl, method, dataType} = queryType;
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

    case 'LOAD_WISH_LIST':
      return {
        type: LOAD_WISHLIST,
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

    default:
      return {
        type: SET_FETCH_ERROR
      }
  }

}

