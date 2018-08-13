const apiSettings = {
  domain: '127.0.0.1',
  port: '9000',
  apiPath: '/api'
};

const dataPath = apiSettings.domain + '/' + apiSettings.port + apiSettings.apiPath;

const dataMap = {
  allEvents: dataPath + '/events',
  event: dataPath + '/event/',
  user: dataPath + '/user'
};

export default dataMap;