'use strict';

import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
  bio: { type: String },
  avatar: { type: String },
  lastName: { type: String },
  firstName: { type: String },

  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
});

export default mongoose.model('profile', profileSchema);
