import dataMap from "./ApiSettings";

export const citiesList = {apiUrl: dataMap.allCities, method: 'GET', dataType: 'ALL_CITIES_LIST'};
export const languagesList = {apiUrl: dataMap.languagesPath, method: 'GET', dataType: 'LANGUAGES_LIST'};
export const categoriesList = {apiUrl: dataMap.categoryPath, method: 'GET', dataType: 'ALL_CATEGORIES_LIST'};
export const wishList = {apiUrl: dataMap.wishlist, method: 'GET', dataType: 'LOAD_WISH_LIST'};
export const wishListAdd = {apiUrl: dataMap.wishlistAdd, method: 'post', dataType: 'ADD_TO_WISH_LIST'};
export const wishListRemove = {apiUrl: dataMap.wishlistRemove, method: 'post', dataType: 'REMOVE_FROM_WISH_LIST'};
export const userData = {apiUrl: dataMap.user, method: 'post', dataType: 'LOAD_USER'};
export const eventsByFilter = {apiUrl: dataMap.filterEvents, method: 'post', dataType: 'LOAD_EVENTS'};
export const topEvents = {apiUrl: dataMap.filterEvents, method: 'post', dataType: 'TOP_EVENTS'};
export const purchaseAdd ={apiUrl: dataMap.purchaseAdd, method:'post', dataType: 'ADD_PURCHASE'};
// export const transfersForward={apiUrl: dataMap.transfer, method:'post', dataType: 'TRANSFERS_FORWARD'};
// export const transfersBackward={apiUrl: dataMap.transfer, method:'post', dataType: 'TRANSFERS_BACKWARD'};
export const eventInfo ={apiUrl: dataMap.event, method: 'GET', dataType: 'EVENT_INFO'};
