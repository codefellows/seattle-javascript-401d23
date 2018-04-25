'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content'};
let mockId = null; 

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

//In this lab, you MUST post first BEFORE you get

describe('VALID request to the API', () => {
  describe('POST /api/v1/note', () => {
    it('should respond with status 201 and created a new note', () => {
      return superagent.post(`:${testPort}/api/v1/note`)
        .send(mockResource)
        .then((res) => {
          console.log(res.body);
          mockId = res.body.id; //HINT: Why do we need to reassign this?
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        })
    });
  });
});
