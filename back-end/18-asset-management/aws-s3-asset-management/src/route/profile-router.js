'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/bearer-auth';

const jsonParser = bodyParser.json();

const profileRouter = new Router();

profileRouter.post('/profiles', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, '_ERROR_ not found'));
  }

  return new Profile({
    ...request.body,
    account: request.account._id,
  }).save()
    .then(profile => response.json(profile))
    .catch(next);
});

export default profileRouter;
