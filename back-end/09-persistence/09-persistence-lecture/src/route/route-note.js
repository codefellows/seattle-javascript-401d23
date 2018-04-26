'use strict';

const logger = require('../lib/logger');
const Note = require('../model/note');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeNote(router) {
  router.post('/api/v1/note', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-NOTE: POST /api/v1/note');

    try {
      const newNote = new Note(req.body.title, req.body.content);
      storage.create('Note', newNote)
        .then((note) => {
          response.sendJSON(res, 201, note);
          return undefined;
          // res.writeHead(201, { 'Content-Type': 'application/json' });
          // res.write(JSON.stringify(note));
          // res.end();
          // return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-NOTE: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      // res.writeHead(400, { 'Content-Type': 'text/plain' });
      // res.write('Bad request');
      // res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/note', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 404, 'Your request requires an id');
      // res.writeHead(404, { 'Content-Type': 'text/plain' });
      // res.write('Your request requires an id');
      // res.end();
      return undefined;
    }

    storage.fetchOne('Note', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.write(JSON.stringify(item));
        // res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
        // res.writeHead(404, { 'Content-Type': 'text/plain' });
        // res.write('Resource not found');
        // res.end();
        return undefined;
      });
    return undefined;
  });
};
