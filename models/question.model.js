const mongoose = require("mongoose");

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
      ref: "User",
      required: true,
    },

    vote: {
      type: Number,
      default: 0,
    },

    reponse: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        text: {
          type: String,
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);