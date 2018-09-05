import {LOGGED_IN, USER_LOGIN} from "./actionsTypes";

export function changeUser(user) {
  return{type: USER_LOGIN, user}
}

export function setLoggedIn(isLogged) {
  return{type: LOGGED_IN, isLogged}
}
