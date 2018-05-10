'use strict';

import jsonWebToken from 'jsonwebtoken';
import HttpError from 'http-errors';
import Account from '../model/account';

const promisify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

export default (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(400, '__ERROR__ authorization header required'));
  }

  const token = request.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return next(new HttpError(400, '__ERROR__ token required'));
  }

  // vinicio - verify is decrypting
  return promisify(jsonWebToken.verify)(token, process.env.CAT_CLOUD_SECRET)
    .catch(error => Promise.reject(new HttpError(401, error)))
    .then((decryptedData) => {
      // vinicio - here is the actual user match
      return Account.findOne({ tokenSeed: decryptedData.tokenSeed });
    })
    .then((account) => {
      if (!account) {
        throw new HttpError(404, '__ERROR__ not found');
      }
      request.account = account;
      return next();
    })
    .catch(next);
};
