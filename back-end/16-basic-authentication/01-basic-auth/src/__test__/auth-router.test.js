'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pRemoveAccountMock, pCreateAccountMock } from './lib/account-mock';


const apiURL = `http://localhost:${process.env.PORT}/signup`;

describe('AUTH Router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('POST should return a 200 status code and a TOKEN', () => {
    return superagent.post(apiURL)
      .send({
        username: 'hound',
        email: 'hound@gregor.com',
        password: 'hound',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });

  test('POST should return 400 for bad not sending required email', () => {
    return superagent.post(apiURL)
      .send({
        // email: 'superawesomeemail@email.com',
        password: 'SUPERSECRETPASSWORD',
      })
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test.only('POST should return 409 for duplicate keys', () => {
    return pCreateAccountMock()
      .then((mockFromPromise) => {
        console.log(mockFromPromise, 'mock from promise');
        const mockAcct = {
          email: mockFromPromise.account.email,
          password: 'fake password',
        };
        // console.log(mockAcct, 'MOCK ACCT');
        return superagent.post(apiURL)
          .send(mockAcct)
          .then(Promise.reject)
          .catch((err) => {
            expect(err.status).toEqual(409);
          });
      });
  });
});
