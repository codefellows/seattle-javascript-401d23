'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Note from '../model/note';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/notes`;

// Vinicio - the main reason to use mocks is the fact that we don't want to
// write a test that relies on both a POST and a GET request
const pCreateNoteMock = () => {
  return new Note({
    title: faker.lorem.words(10),
    content: faker.lorem.words(25),
  }).save(); // returns a promise
};

// const pCreateManyNoteMocks = (howManyNotes) => {
//   // Vinicio - Promise.all takes an array of promises and waits for all the promises to be done
//   return Promise.all(new Array(howManyNotes)
//     .fill(0)
//     .map(() => pCreateNoteMock()));
// };

describe('/api/notes', () => {
  // I know that I'll gave a POST ROUTE
  // The post route will be able to insert a new note to my application
  beforeAll(startServer); // Vinicio - we don't use startServer() because we need a function
  afterAll(stopServer);
  afterEach(() => Note.remove({}));
  test('POST - It should respond with a 200 status ', () => {
    const noteToPost = {
      title: faker.lorem.words(10),
      content: faker.lorem.words(50),
    };
    return superagent.post(apiURL)
      .send(noteToPost)
      .then((response) => {
        // Vinicio - testing status code
        expect(response.status).toEqual(200);
        // Vinicio - Testing for specific values
        expect(response.body.title).toEqual(noteToPost.title);
        expect(response.body.content).toEqual(noteToPost.content);
        // Vinicio - Testing that properties are present
        expect(response.body._id).toBeTruthy();
        expect(response.body.timestamp).toBeTruthy();
      });
  });
  test('POST - It should respond with a 400 status ', () => {
    const noteToPost = {
      content: faker.lorem.words(50),
    };
    return superagent.post(apiURL)
      .send(noteToPost)
      .then(Promise.reject) // Vinicio - this is needed because we are testing for failures
      .catch((response) => {
        // Vinicio - testing status code
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/notes', () => {
    test('should respond with 200 if there are no errors', () => {
      let noteToTest = null; //  Vinicio - we need to preserve the note because of scope rules

      return pCreateNoteMock() // Vinicio - test only a GET request
        .then((note) => {
          noteToTest = note;
          return superagent.get(`${apiURL}/${note._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual(noteToTest.title);
          expect(response.body.content).toEqual(noteToTest.content);
        });
    });
    test('should respond with 404 if there is no note to be found', () => {
      return superagent.get(`${apiURL}/THisIsAnInvalidId`)
        .then(Promise.reject) // Vinicio - testing for a failure
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/notes', () => {
    test('should update a note and return a 200 status code', () => {
      let noteToUpdate = null;
      return pCreateNoteMock()
        .then((noteMock) => {
          noteToUpdate = noteMock;
          // Vinicio - Here, I know I have a new note in my db
          return superagent.put(`${apiURL}/${noteMock._id}`)
            .send({ title: 'Gregor and The Hound are super cool' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Gregor and The Hound are super cool');
          expect(response.body.content).toEqual(noteToUpdate.content);
          expect(response.body._id).toEqual(noteToUpdate._id.toString());
        });
    });
  });
});
