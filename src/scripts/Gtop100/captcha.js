const anticaptcha = require('../../lib/anticaptcha')(
  process.env.ANTICAPTCHA_KEY
);

const URL = 'https://gtop100.com';
const SITE_KEY = '32F41B72-B632-4273-BD6E-9F487499B5B3';

anticaptcha.setWebsiteURL(URL);
anticaptcha.setWebsitePublicKey(SITE_KEY);

anticaptcha.setUserAgent(
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
);

function solveCaptcha() {
  return new Promise((resolve, reject) => {
    anticaptcha.createFunCaptchaTaskProxyless(function (err, taskId) {
      if (err) {
        reject(err);
        console.error(err);
        return;
      }

      console.log('Got task ID', taskId);

      //wait for solution and print to console
      anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
        if (err) {
          reject(err);
          console.error(err);
          return;
        }

        resolve(taskSolution);
      });
    });
  });
}

module.exports = solveCaptcha;
