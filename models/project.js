const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    step1_title: {
      type: String,
      required: true
    },
    step1_content: {
      type: String,
      required: true
    },
    step1_subcontent: {
      type: String,
      required: true
    },
    step2_title: {
      type: String,
      required: true
    },
    step2_content: {
      type: String,
      required: true
    },
    step2_subcontent: {
      type: String,
      required: true
    },
    step3_title: {
      type: String,
      required: true
    },
    step3_content: {
      type: String,
      required: true
    },
    step3_subcontent: {
      type: String,
      required: true
    },
    step4_title: {
      type: String,
      required: true
    },
    step4_subcontent: {
      type: String,
      required: true
    },
    step5_title: {
      type: String,
      required: true
    },
    step5_subcontent: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);
