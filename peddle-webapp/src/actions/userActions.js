import {
  LOGGED_IN, SET_REGISTER_ERROR, SET_REGISTER_PENDING, SET_REGISTER_SUCCESS,
  USER_LOGIN, USER_REGISTER
} from "./actionsTypes";
import dataMap from "../constants/ApiSettings";
import {fetchData} from "../components/fetchData";

export function changeUser(user) {
  return {type: USER_LOGIN, payload: user}
}

export function setLoggedIn(isLogged) {
  return {type: LOGGED_IN, isLogged}
}



export function setRegisterPending(isRegisterPending) {
  return {
    type: SET_REGISTER_PENDING,
    payload: isRegisterPending
  };
}

export function setRegisterSuccess(isRegisterSuccess) {
  return {
    type: SET_REGISTER_SUCCESS,
    payload: isRegisterSuccess
  };
}

export function setRegisterError(registerError) {
  return {
    type: SET_REGISTER_ERROR,
    payload: registerError
  }
}

export function setRegisterData(fetchData) {
  return{
    type: USER_REGISTER,
    payload: fetchData
  }
}

export function fetchRegister(registrationData) {
  return dispatch => {
    dispatch(setRegisterPending(true));
    dispatch(setRegisterSuccess(false));
    dispatch(setRegisterError(null));
    let responseStatus = false;

    let apiUrl=dataMap.register;
    fetchData(apiUrl, 'post', registrationData)
      .then(response => {
        dispatch(setRegisterPending(false));
        responseStatus = response.ok;
        return response;
      })
      .then(response => response.json())
      .then(json => {
        if (responseStatus) {
          dispatch(setRegisterData(json));
          dispatch(setRegisterSuccess(true));
        } else {
          dispatch(setRegisterError(json))
        }
      })
  }
}
