'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Category from '../model/category-model';
import logger from '../lib/logger';


const jsonParser = bodyParser.json();

const categoryRouter = new Router();

categoryRouter.post('/api/categories', jsonParser, (request, response, next) => {
  if (!request.body.title) {
    logger.log(logger.ERROR, 'CATEGORY-ROUTER: Responding with 400 error code');
    return next(new HttpErrors(400, 'Category title is required'));
  }

  return new Category(request.body).save()
    .then(category => response.json(category))
    .catch(next);
});

categoryRouter.put('/api/categories/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Category.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedCategory) => {
      if (!updatedCategory) {
        logger.log(logger.ERROR, 'CATEGORY ROUTER: responding with 404 status code - !updatedCategory');
        return next(new HttpErrors(404, 'category not found'));
      }

      logger.log(logger.INFO, 'GET - responding with 200 status code');
      return response.json(updatedCategory);
    })
    .catch(next);
});

categoryRouter.get('/api/categories/:id', (request, response, next) => {
  return Category.findById(request.params.id)
    .then((category) => {
      if (!category) {
        logger.log(logger.ERROR, 'CATEGORY ROUTER: responding with 404 status code !category');
        return next(new HttpErrors(404, 'category not found'));
      }

      logger.log(logger.INFO, 'CATEGORY ROUTER: responding with 200 status code');
      logger.log(logger.INFO, `CATEGORY ROUTER: ${JSON.stringify(category)}`);
      return response.json(category);
    })
    .catch(next);
});

categoryRouter.delete('/api/categories/:id', (request, response, next) => {
  return Category.findByIdAndRemove(request.params.id)
    .then((category) => {
      if (!category) {
        logger.log(logger.ERROR, 'CATEGORY ROUTER: responding with 404 !category');
        return next(new HttpErrors(404, 'category not found'));
      }

      logger.log(logger.INFO, 'CATEGORY ROUTER: responding with 204 status code');
      return response.sendStatus(204);
    });
});

export default categoryRouter;
