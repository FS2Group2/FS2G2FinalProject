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
export const iconPath = '/img/icons/';
export const userPhotoPath = '/img/users/';

const dataMap = {
  allEvents: dataPath + '/events/all',
  allCities: dataPath + '/city/all',
  event: dataPath + '/events/info/',
  user: dataPath + '/user',
  login: dataPath + '/login',
  register: dataPath + '/register',
  registrationConfirm: dataPath + '/register/',
  filterEvents: dataPath + '/events/filter/',
  accommodations: dataPath + '/accommodations/city/',
  transfer: dataPath + '/transfer',
  wishlist: dataPath + '/wishlist/user-events/',
  wishlistAdd: dataPath + '/wishlist/add-event-to-user',
  purchace: dataPath + '/purchase/all/',
  purchaseAdd: dataPath + '/purchase/add',
  categoryPath: dataPath + "/categories/all"
};

export default dataMap;

export const authHeaders = {
  'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};