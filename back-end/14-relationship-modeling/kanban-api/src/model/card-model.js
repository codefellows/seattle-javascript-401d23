'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Category from './category-model';

const cardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Vinicio - this is _id
    required: true,
    ref: 'category',
  },
});

/* A mongoose hook needs access to
  - a done() function
  - the object we are working with (mongoose calls this 'document')
*/
function cardPreHook(done) { // done is using an (error,data) signature
  // Vinicio - here, the value of 'contextual this' is the document
  return Category.findById(this.category)
    .then((categoryFound) => {
      if (!categoryFound) {
        throw new HttpError(404, 'category not found');
      }
      categoryFound.cards.push(this._id);
      return categoryFound.save();
    })
    .then(() => done()) // done without any arguments mean success - save
    .catch(done); // done with results means an error - do not save
}

// Vinicio - done has an (error, data) signature
const cardPostHook = (document, done) => {
  return Category.findById(document.category)
    .then((categoryFound) => {
      if (!categoryFound) {
        throw new HttpError(500, 'category not found');
      }
      categoryFound.cards = categoryFound.cards.filter((card) => {
        return card._id.toString() !== document._id.toString();
      });
    })
    .then(() => done()) // Vinicio - this implies a success
    .catch(done); // Vinicio - this is being called as done(result);
  // .catch(result => done(result));
};

cardSchema.pre('save', cardPreHook);
cardSchema.post('remove', cardPostHook);

export default mongoose.model('card', cardSchema);
