const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxlength: 32
    },
    slug: {
      type: String,
      unique: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tag", tagSchema);
