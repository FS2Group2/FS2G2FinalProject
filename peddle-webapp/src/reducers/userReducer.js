import {
  LOGGED_IN, SET_REGISTER_ERROR,
  SET_REGISTER_PENDING,
  SET_REGISTER_SUCCESS, SET_UPDATE_PROFILE_ERROR, SET_UPDATE_PROFILE_PENDING, SET_UPDATE_PROFILE_SUCCESS,
  USER_LOGIN,
  USER_REGISTER,
  USER_UPDATE
} from "../actions/actionsTypes";

const initialState = {
  currentUser: {},
  loggedIn: false,
  registerSuccess: false,
  isRegisterPending: false,
  isRegisterSuccess: false,
  registerError: '',
  isProfileUpdatePending: false,
  isProfileUpdateSuccess: false,
  profileUpdateError: false,
  message: {}
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {currentUser: action.payload});
    case USER_REGISTER:
      return {...state, message: action.payload};
    case SET_REGISTER_PENDING:
      return {...state, isRegisterPending: action.payload};
    case SET_REGISTER_SUCCESS:
      return {...state, isRegisterSuccess: action.payload};
    case SET_REGISTER_ERROR:
      return {...state, registerError: action.payload};
    case SET_UPDATE_PROFILE_PENDING:
      return {...state, isProfileUpdatePending: action.payload};
    case SET_UPDATE_PROFILE_SUCCESS:
      return {...state, isProfileUpdateSuccess: action.payload};
    case SET_UPDATE_PROFILE_ERROR:
      return{...state, profileUpdateError: action.payload};
    case USER_UPDATE:
      return {...state, currentUser: action.payload};
    case LOGGED_IN:
      return {...state, loggedIn: action.isLogged};
    default:
      return state;
  }
}

export default userReducer;