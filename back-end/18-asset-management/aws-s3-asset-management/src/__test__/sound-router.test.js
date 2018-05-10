'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pRemoveSoundMock, pCreateSoundMock } from './lib/sound-mock';

// set this to true or false depending on if you want to hit the mock AWS-SDK or if you want to hit the real AWS-SDK, i.e., upload an asset to your real bucket

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('TESTING ROUTES AT /sounds', () => {
  beforeAll(startServer);
  afterEach(pRemoveSoundMock);
  afterAll(stopServer);

  describe('POST 200 for successful post /sounds', () => {
    test('should return 200 for sucessful sound post', () => {
      // only do this if you have a slow computer AND you want to make a real API call to S3
      jest.setTimeout(20000);
      return pCreateSoundMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.post(`${apiUrl}/sounds`)
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'dog barks')
            .attach('sound', `${__dirname}/asset/dog.mp3`)
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body.title).toEqual('dog barks');
              expect(response.body._id).toBeTruthy();
              expect(response.body.url).toBeTruthy();
            });
        })
        .catch((err) => {
          console.log(err.message, 'ERR IN TEST');
          console.log(err.status, 'CODE ERR IN TEST');
          expect(err.status).toEqual(200);
        });
    });
  });
});
