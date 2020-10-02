export const API_URL = process.env && process.env.VUE_APP_API_URL;
export const SERVER_URL = process.env && process.env.VUE_APP_SERVER_URL;

const getParams = (method, body, headers) => {
  const requestHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers
  };
  return {
    method: method,
    headers: requestHeader,
    body:
      requestHeader['Content-Type'] === 'application/json'
        ? JSON.stringify(body)
        : body
  };
};

export const requestAPI = async (endpoint, method, body, headers) => {
  const fullEndpoint = API_URL + endpoint;
  return Promise.race([
    fetch(fullEndpoint, getParams(method, body, headers)),
  ])
    .then(res => {
      try {
        return res.json();
      } catch (e) {
        throw e;
      }
    })
    .catch(error => {
      throw error;
    });
};

export const requestServer = async (endpoint, method, body, headers) => {
  const fullEndpoint = SERVER_URL + endpoint;
  return Promise.race([
    fetch(fullEndpoint, getParams(method, body, headers)),
  ])
    .then(res => {
      try {
        return res.json();
      } catch (e) {
        throw e;
      }
    })
    .then(data => handleError(data))
    .catch(error => {
      throw error;
    });
};

const handleError = response => {
  // console.log('response', response);
  if (!response.success) {
    throw response.error;
  } else {
    return response;
  }
};
