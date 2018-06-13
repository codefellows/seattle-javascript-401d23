'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();

require('dotenv').config();

const GOOGLE_OAUTH_URL = 'https://www.googleapis.com/oauth2/v4/token';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

// Vinicio - we are building a oauth-compliant back-end
app.get('/oauth/google', (request, response) => {
  // Vinicio - we are starting step 3.1
  // Vinicio - we are expecting a CODE
  console.log('___STEP 3.1 - RECEIVING CODE__');
  if(!request.query.code) {
    response.redirect(process.env.CLIENT_URL);
  } else {
    console.log('__CODE__', request.query.code);
    //--------------------------------------------------------------------------
    // 3.2
    //--------------------------------------------------------------------------
    console.log('___STEP 3.2 - SENDING THE CODE BACK__');
    return superagent.post(GOOGLE_OAUTH_URL)
      .type('form')
      .send({
        code: request.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_OAUTH_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google`
      })
      .then(tokenResponse => {
        //--------------------------------------------------------------------------
        // 3.3
        //--------------------------------------------------------------------------
        console.log('___STEP 3.3 - ACCESS TOKEN__');

        if(!tokenResponse.body.access_token) {
          response.redirect(process.env.CLIENT_URL);
        }
        const accessToken = tokenResponse.body.access_token;
        //--------------------------------------------------------------------------
        // 4
        //--------------------------------------------------------------------------
        return superagent.get(OPEN_ID_URL)
          .set('Authorization', `Bearer ${accessToken}`);
      })
      .then(openIDResponse => {
        console.log('___STEP 4 - OPEN ID__');
        console.log(openIDResponse.body);

        // STEP 5
        // Create our own account
        // Create our own token
        // Send TOKEN back to the application
        response.cookie('401d23_TOKEN','I am gregor!');
        response.redirect(process.env.CLIENT_URL);
      })
      .catch(error => {
        console.log(error);
        response.redirect(process.env.CLIENT_URL + '?error=oauth');
      });
  }
});

app.listen(process.env.PORT, () => {
  console.log('__SERVER_UP__', process.env.PORT);
});
