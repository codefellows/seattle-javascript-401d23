// Note:
// title of the note
// content of the note
// timestamp of creation

import mongoose from 'mongoose'; // ES6
// const mongoose = require('mongoose'); // Common JS

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

// Vinicio Mongoose wants to create a model out of a Schema
export default mongoose.model('note', noteSchema);
