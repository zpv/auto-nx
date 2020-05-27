const http = require('../../utils/http');
const FormData = require('form-data');
const { parseCSRF } = require('../../utils/dom');

async function vote() {
  try {
    const { data: votepage } = await http.client.get('/prebb/vote');
    const { csrfToken, csrfSalt } = parseCSRF(votepage);

    const formData = new FormData();

    formData.append('csrf_token', csrfToken);
    formData.append('csrf_salt', csrfSalt);
    formData.append('toplist', 2);

    await http.client.post('/prebb/vote?vote', formData, {
      headers: formData.getHeaders(),
    });

    console.log('[TopG] Voted.');
  } catch (e) {
    console.error('[TopG] Login failed.', e);
  }
}

module.exports = { vote };
