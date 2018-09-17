const apiSettings = {
  domain: 'http://127.0.0.1',
  port: '9000',
  apiPath: '/api'
};

// const dataPath = apiSettings.domain + ':' + apiSettings.port + apiSettings.apiPath;
const dataPath = apiSettings.apiPath;

export const eventImgPath = '/img/';
export const categoryImgPath = '/img/categories/';
export const categoryIconPath = '/img/categories/icons/';
export const userPhotoPath = '/img/users/';

const dataMap = {
  allEvents: dataPath + '/events/all',
  allCities: dataPath + '/city/all',
  event: dataPath + '/events/info/',
  user: dataPath + '/user',
  login: dataPath + '/user/login',
  filterEvents: dataPath + '/events/filter/',
  accommodations: dataPath + '/accommodations/city/',
  transfer: dataPath + '/transfer',
  wishlist: dataPath + '/wishlist/user-events/',
  purchace: dataPath + '/purchase/all/',
  categoryPath: dataPath + "/categories/all"
};

export default dataMap;

export const authHeaders = {
  'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};