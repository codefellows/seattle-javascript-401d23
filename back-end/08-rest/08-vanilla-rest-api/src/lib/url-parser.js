const url = require('url');
const queryString = require('querystring');

module.exports = function urlParser(req) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  return Promise.resolve(req);
};


// module.exports = function normalPromiseParser(req) {
//   return new Promise((resolve, reject) => {
//     if (!req) return reject new Error('didnt get req');
//     req.url = url.parse(req.url);
//     req.url.query = queryString.parse(req.url.query);
//     return resolve(req);
//   });
// }