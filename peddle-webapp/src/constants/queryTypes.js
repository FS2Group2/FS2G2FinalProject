import dataMap from "./ApiSettings";

export const citiesList = {apiUrl: dataMap.allCities, method: 'GET', dataType: 'ALL_CITIES_LIST'};
export const categoriesList = {apiUrl: dataMap.categoryPath, method: 'GET', dataType: 'ALL_CATEGORIES_LIST'};
export const wishList = {apiUrl: dataMap.wishlist+localStorage.getItem("uid"), method: 'GET', dataType: 'LOAD_WISH_LIST'};
export const userData = {apiUrl: dataMap.user, method: 'post', dataType: 'LOAD_USER'};