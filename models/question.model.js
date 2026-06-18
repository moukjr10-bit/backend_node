const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      required: true,
    },

    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    vote: {
      type: Number,
      default: 0,
    },

    commentaire: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: String,
      }
    ],

    reponse: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', questionSchema);