'use strict';

import faker from 'faker';
import Account from '../../model/account';

const pCreateAccountMock = () => {
  const mock = {};
  mock.request = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(10),
  };

  return Account.create(mock.request.username, mock.request.email, mock.request.password)
    .then((account) => {
      // vinicio - this account will be re-written, but we need it for now
      mock.account = account;
      return account.createToken();
    })
    .then((token) => {
      mock.token = token;
      return Account.findById(mock.account._id);
    })
    .then((account) => {
      mock.account = account;
      return mock;
    });
};

const pRemoveAccountMock = () => Account.remove({});

export { pCreateAccountMock, pRemoveAccountMock };
