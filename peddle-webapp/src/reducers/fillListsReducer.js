import {FILL_CATEGORIES_LIST, FILL_CITIES_LIST} from "../actions/actionsTypes";

const initialState = {
  cities: [],
  categories: []
};

function fillListsReducer(state = initialState, action) {
  switch (action.type) {
    case FILL_CITIES_LIST:
      return {...state, cities: action.citiesList};
    case FILL_CATEGORIES_LIST:
      return {...state, categories: action.categoriesList};
    default:
      return state;
  }
}

export default fillListsReducer;