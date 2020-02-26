const mongoose = require("mongoose");

const touristSchema = mongoose.Schema(
  {
    unique_title: {
      type: String,
      required: true
    },
    unique_content: {
      type: String,
      required: true
    },
    unique_subcontent: {
      type: String,
      required: true
    },
    creative_title: {
      type: String,
      required: true
    },
    creative_content: {
      type: String,
      required: true
    },
    creative_subcontent: {
      type: String,
      required: true
    },
    functions_title: {
      type: String,
      required: true
    },
    functions_content: {
      type: String,
      required: true
    },
    functions_subcontent: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tourist", touristSchema);
