'use strict';

import faker from 'faker';
import Profile from '../../model/profile';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock';


const pCreateProfileMock = () => {
  const resultMock = {};

  return pCreateAccountMock()
    .then((accountMock) => {
      resultMock.accountMock = accountMock;

      return new Profile({
        bio: faker.lorem.words(100),
        avatar: faker.random.image(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),

        account: accountMock.account._id,
      }).save();
    })
    .then((profile) => {
      resultMock.profile = profile;
      return resultMock;
    });
};

const pRemoveProfileMock = () => {
  return Promise.all([
    Profile.remove({}),
    pRemoveAccountMock(),
  ]);
};

export { pCreateProfileMock, pRemoveProfileMock };
