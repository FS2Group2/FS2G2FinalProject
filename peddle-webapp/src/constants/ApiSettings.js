const apiSettings = {
  domain: 'http://127.0.0.1',
  port: '9000',
  apiPath: '/api'
};

// const dataPath = apiSettings.domain + ':' + apiSettings.port + apiSettings.apiPath;
const dataPath = apiSettings.apiPath;

const dataMap = {
  allEvents: dataPath + '/events/all',
  allCities: dataPath + '/city/all',
  event: dataPath + '/events/info/',
  user: dataPath + '/user',
  filterEvents: dataPath + '/events/filter/',
  accommodations: dataPath + '/accommodations/city/',
  transfer: dataPath + '/transfer'
};

export default dataMap;

export const eventImgPath = '/img/';