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
    formData.append('toplist', 1);

    await http.client.post('/prebb/vote?vote', formData, {
      headers: formData.getHeaders(),
    });

    console.log('[XtremeTop100] Voted.');
  } catch (e) {
    console.error('[XtremeTop100] Vote failed.', e);
  }
}

module.exports = { vote };
