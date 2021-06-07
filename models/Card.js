const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  selectedDate: {
    type: Date,
    default: Date.now(),
  },
  label: {
    type: String,
  },
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
        required: true,
      },
      label: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
      },
    },
  ],
  checklist: [
    {
      text: {
        type: String,
      },
      complete: {
        type: Boolean,
      },
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Card = model('card', CardSchema);
