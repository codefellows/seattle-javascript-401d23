'use strict';

const uuid = require('uuid/v4');
const logger = require('../lib/logger');

module.exports = class {
  constructor(title, content) {
    if (!title || !content) throw new Error('POST request requires title and content');
    this.title = title;
    this.content = content;
    this.id = uuid();
    logger.log(logger.INFO, `NOTE: created a new note ${JSON.stringify(this)}`);
  }
};
