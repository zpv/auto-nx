const http = require('../../utils/http');
const FormData = require('form-data');
const solveCaptcha = require('./captcha');
const { parseCSRF } = require('../../utils/dom');

const pingUsernameRegex = /.*pingUsername=(.*)/;

async function vote() {
  const { data: votepage } = await http.client.get('/prebb/vote');
  const { csrfToken, csrfSalt } = parseCSRF(votepage);

  const formData = new FormData();

  formData.append('csrf_token', csrfToken);
  formData.append('csrf_salt', csrfSalt);
  formData.append('toplist', 0);

  const {
    data: { url },
  } = await http.client.post('/prebb/vote?vote', formData, {
    headers: formData.getHeaders(),
  });

  const captchaToken = await solveCaptcha();
  const pingUsername = decodeURIComponent(pingUsernameRegex.exec(url)[1]);
  console.log(captchaToken);
  console.log(url);
  const params = new URLSearchParams();

  params.append('site', '93369');
  params.append('pingUsername', pingUsername);
  params.append('fcToken', captchaToken);

  // these fields don't actually matter
  params.append('fingerprintid', 'a50283ba54286ffa9e9e00de8b6c323a');
  params.append('minecraftname', 'America/Toronto');
  params.append('tz', 'undefined');
  params.append(
    'reToken',
    '03AGdBq279gRWUrUf8haaqE_NDRHgflp-ZaxknI1y1Hbk7LgnqBDmDfXZqsRGWMjtqYgcodCZ-RJBL3DlPz06ewasqj2tUZLfgfoeg3sN9X8p7ML-fSgiP6Tw38mRe4B6siCdqQ6u9L7HhrfD6zRT_Sd0Yg_qNwPaffrI-9lLNLnWmdmJo2qZcvE5VeT_b99SUMSeCqutUN2GWsMW-4uXhwWSkP36R3hC_FQ6EiUUP5dihk9AeoKovyBxQPWckInRijyDykvameUixOIfD6xaudEO4WlgVZ03qVZgCLBC26S6u-FZ5zSSZjsdb-ymT4gbkcQMhKSLf_mwkn2v9qn5A9GzH9mEJm1bVpv4ZPM34vgJkqAmBVc02ES1QRriE9noYlttShSnbnhti'
  );

  const { data } = await http.client.post(
    'https://gtop100.com/home/send_vote',
    params
  );

  console.log(data);
  console.log('[Gtop100] Voted.');
}

module.exports = { vote };
