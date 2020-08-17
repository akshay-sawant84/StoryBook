const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = Schema({
  // userId: {
  //     type: String,
  //     required: true,
  //   },
  // name : {
  //     type : String
  // },
  // image : {
  //     type : String
  // },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Public",
  },
  commentAllowance: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  comments: [
    {
      commentBody: {
        type: String,
      },
      commentingUser: {
        type: String,
      },
      commentDate: {
        type: Date,
        default: Date.now(),
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Content = mongoose.model("Content", contentSchema);
