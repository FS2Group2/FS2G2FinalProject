const apiSettings = {
  domain: 'http://127.0.0.1',
  port: '9000',
  apiPath: '/api'
};

// const dataPath = apiSettings.domain + ':' + apiSettings.port + apiSettings.apiPath;
const dataPath = apiSettings.apiPath;

// export const eventImgPath = 'https://peddle-bucket.s3.amazonaws.com/events/';
export const eventImgPath = '';
// export const eventImgPath = '/img/';
// export const categoryImgPath = '/img/categories/';
export const categoryImgPath = 'https://peddle-bucket.s3.amazonaws.com/categories/';
export const categoryIconPath = '/img/categories/icons/';
export const iconPath = '/img/icons/';
// export const userPhotoPath = '/img/users/';
export const userPhotoPath = '';

const dataMap = {
  allEvents: dataPath + '/events/all',
  allCities: dataPath + '/city/all',
  event: dataPath + '/events/info/',
  user: dataPath + '/user',
  userUpdate: dataPath + '/user/update',
  userPhoto: dataPath + '/avatar',
  login: dataPath + '/login',
  register: dataPath + '/register',
  remindPass: dataPath + '/remind',
  registrationConfirm: dataPath + '/register/',
  filterEvents: dataPath + '/events/filter/',
  accommodations: dataPath + '/accommodations/city/',
  transfer: dataPath + '/transfer',
  wishlist: dataPath + '/wishlist/user-events/',
  wishlistAdd: dataPath + '/wishlist/add-event-to-user',
  wishlistRemove: dataPath + '/wishlist/delete-event-from-user',
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