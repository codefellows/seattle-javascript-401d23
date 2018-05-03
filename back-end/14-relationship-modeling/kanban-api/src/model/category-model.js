'use strict';

import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  // this is your "many" model that you'll think about tomorrow
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'card', // your "many" model name goes here
    },
  ],
}, { // Vinicio - This brace is closing the Schema definition
  usePushEach: true,
});

export default mongoose.model('category', categorySchema);
