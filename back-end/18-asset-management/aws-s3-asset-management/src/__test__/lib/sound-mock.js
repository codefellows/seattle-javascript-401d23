'use strict';

import faker from 'faker';
import { pCreateAccountMock, pRemoveAccountMock } from '../lib/account-mock';
import Sound from '../../model/sound';
import Account from '../../model/account';


const pCreateSoundMock = () => {
  const resultMock = {};
  return pCreateAccountMock()
    .then((mockAcctResponse) => {
      resultMock.accountMock = mockAcctResponse;

      return new Sound({
        title: faker.lorem.words(5),
        url: faker.random.image(),
        account: resultMock.accountMock.account._id,
      }).save();
    })
    .then((sound) => {
      resultMock.sound = sound;
      return resultMock;
    });
};


const pRemoveSoundMock = () => Promise.all([Account.remove({}), Sound.remove({})]);

export { pCreateSoundMock, pRemoveSoundMock };
