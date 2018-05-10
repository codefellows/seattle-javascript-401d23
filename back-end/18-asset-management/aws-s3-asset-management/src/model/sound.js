'use strict';

import mongoose from 'mongoose';

const soundSchema = mongoose.Schema({
  title: { 
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date, 
    default: () => new Date(),
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('sound', soundSchema);
