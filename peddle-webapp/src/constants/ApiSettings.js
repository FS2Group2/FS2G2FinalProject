const apiSettings = {
  domain: 'http://127.0.0.1',
  port: '9000',
  apiPath: '/api'
};

// const dataPath = apiSettings.domain + ':' + apiSettings.port + apiSettings.apiPath;
const dataPath = apiSettings.apiPath;

const dataMap = {
  allEvents: dataPath + '/event',
  event: dataPath + '/event/',
  user: dataPath + '/user'
};

export default dataMap;