import {FILL_CATEGORIES_LIST, FILL_CITIES_LIST, LOAD_TOP_EVENTS} from "./actionsTypes";

export function fillCitiesList(citiesList) {
  return{type: FILL_CITIES_LIST, payload: citiesList}
}

export function fillCategoriesList(categoriesList) {
  return{type: FILL_CATEGORIES_LIST, payload: categoriesList}
}

export function fillTopEventsList(eventList) {
  return{type: LOAD_TOP_EVENTS, payload: eventList}
}