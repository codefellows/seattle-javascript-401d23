'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import Card from '../model/card-model';

const jsonParser = bodyParser.json();
const cardRouter = new Router();

cardRouter.post('/api/cards', jsonParser, (request, response, next) => {
  // TODO: Optional validation

  return new Card(request.body).save()
    .then((card) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      response.json(card);
    })
    .catch(next);
  // .catch(error => next(error)); // Line 17 and 18 are equivalent
});

cardRouter.put('/api/cards/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };

  return Card.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedCard) => {
      if (!updatedCard) {
        logger.log(logger.INFO, 'PUT - responding with a 404 status code');
        return next(new HttpError(404, 'card not found'));
      }
      logger.log(logger.INFO, 'PUT - responding with a 200 status code');
      return response.json(updatedCard); // Vinicio - Returns a 200
    })
    .catch(next);
});

export default cardRouter;
