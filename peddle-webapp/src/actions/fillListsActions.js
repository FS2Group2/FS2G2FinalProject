import {FILL_CITIES_LIST} from "./actionsTypes";

export function fillCitiesList(citiesList) {
  return{type: FILL_CITIES_LIST, citiesList}
}