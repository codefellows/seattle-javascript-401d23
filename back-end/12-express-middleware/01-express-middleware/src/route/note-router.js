'use strict';

/*
import express from 'express';
const Router = express.Router;
 */

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Note from '../model/note';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const noteRouter = new Router();
// const noteRouter = module.exports = new Router(); // ES5

// Vinicio - needs data from the request
noteRouter.post('/api/notes', jsonParser, (request, response, next) => {
  if (!request.body.title) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return next(new HttpErrors(400, 'title is required'));
  }
  return new Note(request.body).save()
    .then((note) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(note);
    })
    .catch(next);
});

// Vinicio - needs data from the request
noteRouter.put('/api/notes/:id', jsonParser, (request, response, next) => {
  // Vinicio - new means that mongoose will return the updated object after updating.
  const options = { runValidators: true, new: true };

  return Note.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedNote) => {
      if (!updatedNote) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!note)');
        return next(new HttpErrors(404, 'note not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(updatedNote);
    })
    .catch(next);
});

noteRouter.get('/api/notes/:id', (request, response, next) => {
  return Note.findById(request.params.id)
    .then((note) => { // Vinicio - note found OR note not found, but the id looks good
      if (!note) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!note)');
        return next(new HttpErrors(404, 'note not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(note);
    })
    .catch(next);
});

export default noteRouter;
