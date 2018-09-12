import {LOGGED_IN, USER_LOGIN} from "../actions/actionsTypes";

const initialState = {
  currentUser: {},
  loggedIn: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {currentUser: action.user});
    case LOGGED_IN:
      return {...state, loggedIn: action.isLogged};
    default:
      return state;
  }
}

export default userReducer;