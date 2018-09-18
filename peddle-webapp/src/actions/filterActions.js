import {
  FILTER_RESET,
  SET_FILTER_CATEGORY,
  SET_FILTER_CITY,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TO
} from "./actionsTypes";

export function setFilterCategory(categoryId) {
  return {type: SET_FILTER_CATEGORY, payload: categoryId}
}

export function setFilterCity(city) {
  return {type: SET_FILTER_CITY, payload: city}
}

export function setFilterDateFrom(date) {
  return {type: SET_FILTER_DATE_FROM, payload: date}
}

export function setFilterDateTo(date) {
  return {type: SET_FILTER_DATE_TO, payload: date}
}

export function filterReset() {
  return {type: FILTER_RESET}
}
