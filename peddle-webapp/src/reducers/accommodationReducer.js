import {
  SET_ACCOMMODATIONS,
  SET_LOAD_ACCOMMODATION_ERROR,
  SET_LOAD_ACCOMMODATION_PENDING,
  SET_LOAD_ACCOMMODATION_SUCCESS
} from "../actions/actionsTypes";

const initialState = {
  isLoadAccommodationSuccess: false,
  isLoadAccommodationPending: false,
  loadAccommodationError: null,
  accommodations: []
};

function accommodationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOAD_ACCOMMODATION_PENDING:
      return {
        ...state,
        isLoadAccommodationPending: action.payload
      };

    case SET_LOAD_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        isLoadAccommodationSuccess: action.payload
      };

    case SET_LOAD_ACCOMMODATION_ERROR:
      return {
        ...state,
        loadAccommodationError: action.payload
      };

    case SET_ACCOMMODATIONS:
      return{
        ...state,
        accommodations: action.payload
      };

    default:
      return state;
  }
}

export default accommodationReducer;