import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

class BaseAPI {
  // Private
  get(url, params) {
    return sendRequest(url, client.get(url, { params }));
  }

  post(url, data) {
    return sendRequest(url, client.post(url, data));
  }

  put(url, data) {
    return sendRequest(url, client.put(url, data));
  }

  // Public
  delete(url) {
    return sendRequest(url, client.delete(url));
  }

  getData(url, params) {
    return this.get(url, params).then(response => response.data);
  }

  postData(url, data) {
      return this.post(url, data).then(response => response.data);
  }

  putData(url, data) {
    return this.put(url, data).then(response => response.data);
  }    
}


function sendRequest(endpoint, promise) {
  return promise.catch((error) => {
    console.error(`[API] ${error.code} ${endpoint} : ${error.message}`);
    const apiError = constructApiErrorResponse(error);
    console.error(apiError);
    throw apiError
  });
}


function constructApiErrorResponse(error) {
  const code = error.response ? error.response.status : -1;
  if (!error.response || !error.response.data || !error.response.data.errors) {
    return {
      code: code,
      errors: []
    };
  }

  return {
    code: code,
    errors: error.response.data.errors
  };
}


// Base API object
// All other API objects make use of this
const base = new BaseAPI();

export default base;
