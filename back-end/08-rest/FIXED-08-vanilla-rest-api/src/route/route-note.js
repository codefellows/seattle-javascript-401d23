'use strict';

const logger = require('../lib/logger');
const Note = require('../model/note');
const storage = require('../lib/storage');

module.exports = function routeNote(router) {
  router.post('/api/v1/note', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-NOTE: POST /api/v1/note');

    try {
      const newNote = new Note(req.body.title, req.body.content);
      storage.create('Note', newNote)
        .then((note) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(note));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-NOTE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/note', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }

    storage.fetchOne('Note', req.url.query.id)
      .then((item) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
