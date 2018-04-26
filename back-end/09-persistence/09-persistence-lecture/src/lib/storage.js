'use strict';
//TODO: refactor to use bluebird

const logger = require('./logger');
const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
// const memory = {};


// schema is the type of resource, in this case note, and it will just be a 'string' saying this is a note schema
// item is an actual object we'll pass in to post a newly created note
storage.create = function create(schema, item) {
  if (!schema) return Promise.reject(new Error('Cannot create a new item, schema required'));
  if (!item) return Promise.reject(new Error('Cannot create a new item, item required'));
  const json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, json)
    .then(() => {
      logger.log(logger.INFO, 'STORAGE: Created a new resource');
      return item;
    })
    .catch(err => Promise.reject(err));

  // return new Promise((resolve, reject) => {
  //   if (!schema) return reject(new Error('Cannot create a new item, schema required'));
  //   if (!item) return reject(new Error('Cannot create a new item, item required'));

  //   if (!memory[schema]) memory[schema] = {};

  //   memory[schema][item.id] = item;
  //   return resolve(item);
  // });
};

storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) => {
      try {
        const item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
  // return new Promise((resolve, reject) => {
  //   if (!schema) return reject(new Error('expected schema name'));
  //   if (!id) return reject(new Error('expected id'));
  //   if (!memory[schema]) return reject(new Error('schema not found'));
  //   const item = memory[schema][id];
  //   if (!item) {
  //     return reject(new Error('item not found'));
  //   } 
  //   return resolve(item);
  //   // return undefined;
  // });
};

storage.fetchAll = function fetchAll() {
  
};



storage.update = function update() {

};

storage.delete = function del() {

};
