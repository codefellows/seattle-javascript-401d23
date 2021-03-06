process.env.NODE_ENV = 'development';
process.env.PORT = 7000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';
process.env.CAT_CLOUD_SECRET = 'top secret';

// set this to true or false depending on if you want to hit the mock AWS-SDK 
// set to false if you want to make a real API call to your bucket

const isAwsMock = false;

if (isAwsMock) {
  process.env.AWS_BUCKET = 'fake';
  process.env.AWS_SECRET_ACCESS_KEY = 'fakeasdfasdfsafdsafsadfasfasdfsadfsadfsadfdsafas';
  process.env.AWS_ACCESS_KEY_ID = 'fakekeyinsidetestenv';
  require('./setup');
} else {
  // remember to set your .env vars and add .env in .gitignore
  require('dotenv').config();
}  

