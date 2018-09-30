import {SET_FETCH_ERROR, SET_FETCH_PENDING, SET_FETCH_SUCCESS} from "../actions/actionsTypes";

const initReducer = {
  isFetchSuccess: false,
  isFetchPending: false,
  fetchError: null
  // userData: null
};

export default function fetchDataReducer(state = initReducer, action) {
  switch (action.type) {
    case SET_FETCH_PENDING:
      return {
        ...state,
        isFetchPending: action.payload
      };

    case SET_FETCH_SUCCESS:
      return {
        ...state,
        isFetchSuccess: action.payload
      };

    case SET_FETCH_ERROR:
      return {
        ...state,
        fetchError: action.payload
      };

    default:
      return state;
  }
}