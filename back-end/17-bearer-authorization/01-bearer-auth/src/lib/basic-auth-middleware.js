'use strict';

import HttpError from 'http-errors';
import Account from '../model/account';

// Vinicio - request, response, and next is the REQUIRED signature for a middleware
export default (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }
  // Vinicio - if I'm here, I know I have the right header
  const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  if (!base64AuthHeader) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }

  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  // Vinicio - at this point, stringAuthHeader looks like username:password
  const [username, password] = stringAuthHeader.split(':');

  if (!username || !password) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }

  // Vinicio - here, we know we have a username and a password

  return Account.findOne({ username })
    .then((account) => {
      if (!account) {
        return next(new HttpError(400, 'AUTH - invalid request'));
      }
      return account.pVerifyPassword(password);
    })
    .then((account) => {
      // Vinicio - in this line. I have the correct account
      request.account = account;
      return next(); // Vinicio - calling the next function in the middleware chain
    })
    .catch(next);
};
