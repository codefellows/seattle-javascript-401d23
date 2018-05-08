'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Vinicio - used to generate hash
import crypto from 'crypto'; // Vinicio - used to generate random data
import jsonWebToken from 'jsonwebtoken';
import HttpError from 'http-errors';

// Vinicio - CAPS naming conventions apply to strings and numbers
const HASH_ROUNDS = 8;
const TOKEN_SEED_LENGTH = 128;

// VINICIO - THIS SCHEMA SHOULD NEVER LEAVE THE SERVER
const accountSchema = mongoose.Schema({
  passwordHash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
});

// Vinicio - This function is going to be used to login
function pVerifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash)
    .then((result) => {
      if (!result) {
        // Vinicio - A 401 code would be the 'proper' response
        throw new HttpError(400, 'AUTH - incorrect data');
      }
      return this; // Vinicio - return this; returns the current account
    });
}

function pCreateToken() {
  // Vinicio - `this` is equal to the account object we are working with.
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((account) => {
      // Vinicio - at this point, we have a token seed.
      // Vinicio - sign === encrypt
      return jsonWebToken.sign(// Vinicio - this line retuns a promise that resolves to a token
        { tokenSeed: account.tokenSeed },
        process.env.SOUND_CLOUD_SECRET,
      ); // Vinicio - When this promises resolves, I have a token
    });
  // Vinicio - TODO: error management
}

accountSchema.methods.pCreateToken = pCreateToken;
accountSchema.methods.pVerifyPassword = pVerifyPassword;

const Account = mongoose.model('account', accountSchema);

/* Hash variables:
    - SALT
    - Hashing algo (bcrypt)
    - password
    - rounds
 */
Account.create = (username, email, password) => {
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      // Vinicio - we have the password hash
      password = null; // eslint-disable-line
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex'); // Vinicio - hex is used due to HTTP
      return new Account({
        username,
        email,
        passwordHash,
        tokenSeed,
      }).save();
    });
};

export default Account;
