import {FILL_CATEGORIES_LIST, FILL_CITIES_LIST} from "./actionsTypes";

export function fillCitiesList(citiesList) {
  return{type: FILL_CITIES_LIST, citiesList}
}

export function fillCategoriesList(categoriesList) {
  return{type: FILL_CATEGORIES_LIST, categoriesList}
}