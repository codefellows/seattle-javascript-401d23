'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pRemoveProfileMock } from './lib/profile-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('POST /profiles', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveProfileMock);

  test('Should return a 200 and a profile if there are no errors', () => {
    let accountMock = null;

    return pCreateAccountMock()
      .then((mock) => {
        accountMock = mock;
        return superagent.post(`${apiURL}/profiles`)
          .set('Authorization', `Bearer ${accountMock.token}`) // vinicio - headers
          .send({
            bio: 'I am a cat',
            firstName: 'Gregor',
            lastName: 'Sánchez',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.account).toEqual(accountMock.account._id.toString());
        expect(response.body.firstName).toEqual('Gregor');
        expect(response.body.lastName).toEqual('Sánchez');
        expect(response.body.bio).toEqual('I am a cat');
      });
  });
});
