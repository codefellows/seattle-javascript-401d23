'use strict';

import faker from 'faker';
import Card from '../../model/card-model';
import * as categoryMock from './category-mock'; // Vinicio - this is considered bad practice
// import { pCreateCategoryMock, pRemoveCategoryMock} from "./category-mock";

const pCreateCardMock = () => {
  const resultMock = {};

  return categoryMock.pCreateCategoryMock() // Vinicio - creating a category
    .then((createdCategory) => {
      // Vinicio - Step 2 : Create a new card
      resultMock.category = createdCategory;

      return new Card({
        title: faker.lorem.words(5),
        content: faker.lorem.words(10),
        category: createdCategory._id,
      }).save();
    })
    .then((newCard) => {
      resultMock.card = newCard;
      return resultMock;
    });
};

const pRemoveCardMock = () => Promise.all([
  Card.remove({}),
  categoryMock.pRemoveCategoryMock(),
]);

export { pCreateCardMock, pRemoveCardMock };
