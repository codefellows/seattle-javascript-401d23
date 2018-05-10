'use strict';


import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import Account from '../model/account';
import logger from '../lib/logger';
import basicAuthMiddleware from '../lib/basic-auth-middleware';

const jsonParser = bodyParser.json();
const authRouter = new Router();

authRouter.post('/signup', jsonParser, (request, response, next) => {
  if (!request.body.username || !request.body.email || !request.body.password) {
    return next(new HttpError(400, '__ERROR__ username, email, and password required to create an account'));
  }

  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((user) => {
      logger.log(logger.INFO, 'AUTH - Creating Token');
      return user.createToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'AUTH - Returning a 200 status and a token');
      return response.json({ token });
    })// vinicio - ES6 object creation shorthand
    .catch(next);
});

authRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, '_ERROR_ not found'));
  }

  return request.account.createToken()
    .then(token => response.json({ token }))
    .catch(next);
});

export default authRouter;
