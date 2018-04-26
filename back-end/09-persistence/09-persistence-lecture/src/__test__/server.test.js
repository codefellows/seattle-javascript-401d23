'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title AFTER PERSIST', content: 'test content AFTER PERSTIST' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

// In this lab, you MUST post first BEFORE you get
describe('VALID request to the API', () => {
  describe('POST /api/v1/note', () => {
    it('should respond with status 201 and created a new note', () => {
      return superagent.post(`:${testPort}/api/v1/note`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/note', () => {
    it('should respond with the a previously created note', () => {
      // console.log(mockId, 'MOCK ID IN GET BLOCK')
      return superagent.get(`:${testPort}/api/v1/note?id=${mockId}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
        //if testing for errors, test them in a .catch block
    });
  });
});
