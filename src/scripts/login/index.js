const http = require('../../utils/http');
const FormData = require('form-data');
const { parseCSRF } = require('../../utils/dom');

async function login(username, password) {
  try {
    const { data: homepage, headers } = await http.client.get('/');
    const cookie = headers['set-cookie'][1];
    http.setCookies(cookie);

    const { csrfToken, csrfSalt } = parseCSRF(homepage);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('csrf_token', csrfToken);
    formData.append('csrf_salt', csrfSalt);

    await http.client.post('/prebb/signin', formData, {
      headers: formData.getHeaders(),
    });
  } catch (e) {
    console.error('[Login] Login failed.');
  }
}

module.exports = login;
