'use strict';

import faker from 'faker';
import Account from '../../model/account';


const pCreateAccountMock = () => {
  const mock = {};
  mock.request = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
  return Account.create(mock.request.username, mock.request.email, mock.request.password)
    .then((account) => {
      mock.account = account;
      return account.pCreateToken(); // Vinicio - this line changes the token Seed
    })
    .then((token) => {
      // Vinicio - token is the actual token
      mock.token = token;
      // Vinicio - here, I know that account has changed (tokenSeed)
      return Account.findById(mock.account._id);
    })
    .then((account) => {
      mock.account = account;
      return mock;
    });
};

const pRemoveAccountMock = () => Account.remove({});

export { pCreateAccountMock, pRemoveAccountMock };
