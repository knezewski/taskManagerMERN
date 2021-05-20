const { Schema, model } = require('mongoose');

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: Date,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'lists',
      },
    ],
    activity: [
      {
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    backgroundURL: {
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
        level: {
          type: Number,
        },
        group: {
          type: String,
        },
        label: {
          type: String,
          default: "Project manager"
        },
        value: {
          type: String,
          default: "project-manager"
        },
        isAdmin: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Board = model('board', BoardSchema);
