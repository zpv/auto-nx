const { JSDOM } = require('jsdom');

function parseCSRF(pageData) {
  const {
    window: { document },
  } = new JSDOM(pageData);

  const {
    attributes: {
      value: { value: csrfToken },
    },
  } = document.querySelector('input[name=csrf_token]');

  const {
    attributes: {
      value: { value: csrfSalt },
    },
  } = document.querySelector('input[name=csrf_salt]');

  return { csrfToken, csrfSalt };
}

module.exports = { parseCSRF };
