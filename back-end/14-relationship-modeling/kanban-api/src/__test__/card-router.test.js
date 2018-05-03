'use strict';

import faker from 'faker';
import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateCategoryMock } from './lib/category-mock';
import { pCreateCardMock, pRemoveCardMock } from './lib/card-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api/cards`;

describe('/api/cards', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveCardMock);

  describe('POST /api/cards', () => {
    test('200 status code in creation', () => {
      // Vinicio  - to create a 'real' card I need a mock category
      return pCreateCategoryMock() // Vinicio - Mock
        .then((categoryMock) => {
          const cardToPost = {
            title: faker.lorem.words(10),
            content: faker.lorem.words(11),
            category: categoryMock._id,
          };

          return superagent.post(apiUrl) // Vinicio - making a real request
            .send(cardToPost)
            .then((response) => {
              expect(response.status).toEqual(200);
            });
        });
    });
  }); // describe
  describe('PUT /api/cards', () => {
    test('200 status code in creation', () => {
      // Vinicio  - to create a 'real' card I need a mock category
      let cardToUpdate = null;
      return pCreateCardMock()
        .then((mock) => {
          cardToUpdate = mock.card;
          return superagent.put(`${apiUrl}/${mock.card._id}`)
            .send({ title: 'Gregor and The Hound' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Gregor and The Hound');
          expect(response.body.content).toEqual(cardToUpdate.content);
        });
    });
  }); // describe
});
