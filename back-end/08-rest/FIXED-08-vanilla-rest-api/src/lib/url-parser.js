
const logger = require('./logger');
const url = require('url');
const queryString = require('querystring');

module.exports = function urlParser(req) {

  // console.log(req, 'REQ IN URL PARSER')
  // if (//something does not validate) return Promise.reject(some err);
  req.url = url.parse(req.url);
  // console.log(req.url, 'asdfasdfasdf00')
  req.url.query = queryString.parse(req.url.query);

  // this just says I want to return a PRomise, but I don't care about handling a rejection, I just want to successfully resolve this request and pass it down, .catch won't do anything, this is just a .then scenario, but I can work asynchronously
  return Promise.resolve(req);
};

// module.exports = function normalPromiseParser(req) {
//   return new Promise((resolve, reject) => {
//     req.url = url.parse(req.url);
//     req.url.query = queryString.parse(req.url.query);
//     return resolve(req);
//   });
// }