const axios = require('axios');

const BASE_URL = 'https://www.croosade.com/';
let client = axios.create({ baseURL: BASE_URL });

// Clear session
function clearCookies() {
  client.defaults.headers.Cookie = null;
}

function setCookies(cookies) {
  client.defaults.headers.Cookie = cookies;
}

module.exports = { client, setCookies, clearCookies };
