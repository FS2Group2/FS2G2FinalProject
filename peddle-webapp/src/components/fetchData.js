export function fetchData(apiUrl, method, query) {
  let authHeaders = {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  let reqParam;
  if(method.toString().toLowerCase()==='post'){
    reqParam = {
      method: method,
      headers: authHeaders,
      body: JSON.stringify(query)
    }
  }
   else{
    reqParam = {
      method: method,
      headers: authHeaders
    };
  }

  return fetch(apiUrl, reqParam)
}
