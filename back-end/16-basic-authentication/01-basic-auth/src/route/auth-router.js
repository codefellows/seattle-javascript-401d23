'use strict';

import { Router } from 'express'; // Vinicio - interview keywords : de-structuring and module
import { json } from 'body-parser';
import Account from '../model/account';
import logger from '../lib/logger';

const authRouter = new Router();
const jsonParser = json();

authRouter.post('/signup', jsonParser, (request, response, next) => {
  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((account) => {
      // Vinicio - we want to get rid of the password as early as possible
      delete request.body.password;
      logger.log(logger.INFO, 'AUTH - creating TOKEN');
      return account.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'AUTH - returning a 200 code and a token');
      return response.json({ token });
    })
    .catch(next);
});

export default authRouter;
