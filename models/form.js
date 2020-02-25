const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    content: {
      type: String
    },
    subject: {
      type: String
    },
    detail: {
      default: "visit",
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Form", formSchema);
