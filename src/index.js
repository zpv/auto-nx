const http = require('./utils/http');

const { USERNAME, PASSWORD } = process.env;
const login = require('./scripts/login');

const Gtop100 = require('./scripts/Gtop100');
const TopG = require('./scripts/TopG');
const XtremeTop100 = require('./scripts/XtremeTop100');

async function exec() {
  http.clearCookies();

  await login(USERNAME, PASSWORD);

  await Gtop100.vote();
  await TopG.vote();
  await XtremeTop100.vote();
}

// run every 6 hours (+ 5 mins) lmao
setInterval(exec, 6 * 60 * 60 * 1000 + 5 * 60 * 1000);
exec();
