import {SET_FETCH_ERROR, SET_FETCH_PENDING, SET_FETCH_SUCCESS} from "../actions/actionsTypes";

const initReducer = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
  // userData: null
};

export default function fetchDataReducer(state = initReducer, action) {
  switch (action.type) {
    case SET_FETCH_PENDING:
      return {...state,
        isLoginPending: action.payload
      };

    case SET_FETCH_SUCCESS:
      return { ...state,
        isLoginSuccess: action.payload
      };

    case SET_FETCH_ERROR:
      return { ...state,
        loginError: action.payload
      };
    //
    // case SET_FETCH_DATA:
    //   return {
    //     ...state,
    //     userData: action.payload
    //   };

    default:
      return state;
  }
}