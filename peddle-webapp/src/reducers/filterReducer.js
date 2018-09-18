import {
  FILTER_RESET,
  SET_FILTER_CATEGORY,
  SET_FILTER_CITY,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TO
} from "../actions/actionsTypes";

const initialState={
  category: 0,
  city:'',
  dateStart: new Date(Date.now()).toLocaleDateString('en-GB'),
  dateFin: '01/01/2050'
};

function filterReducer(state=initialState, action) {
  switch (action.type) {
    case SET_FILTER_CATEGORY:
      return{...state, category: action.payload};
    case SET_FILTER_CITY:
      return{...state, city: action.payload};
    case SET_FILTER_DATE_TO:
      return{...state, dateFin: action.payload};
    case SET_FILTER_DATE_FROM:
      return{...state, dateStart: action.payload};
    case FILTER_RESET:
      return {...state, ...initialState};
    default:
      return state;
  }
}

export default filterReducer;