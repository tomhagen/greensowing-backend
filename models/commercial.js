const mongoose = require("mongoose");

const commercialSchema = mongoose.Schema(
  {
    covering_title: {
      type: String,
      required: true
    },
    covering_content: {
      type: String,
      required: true
    },
    covering_subcontent1: {
      type: String,
      required: true
    },
    covering_subtitle: {
      type: String,
      required: true
    },
    covering_subcontent2: {
      type: String,
      required: true
    },
    structure_title: {
      type: String,
      required: true
    },
    structure_content: {
      type: String,
      required: true
    },
    structure_subcontent1: {
      type: String,
      required: true
    },
    structure_subtitle1: {
      type: String,
      required: true
    },
    structure_subtitle2: {
      type: String,
      required: true
    },
    structure_subcontent2: {
      type: String,
      required: true
    },
    structure_subcontent3: {
      type: String,
      required: true
    },
    irrigation_title: {
      type: String,
      required: true
    },
    irrigation_subcontent: {
      type: String,
      required: true
    },
    irrigation_item_subcontent1: {
      type: String,
      required: true
    },
    irrigation_item_subcontent2: {
      type: String,
      required: true
    },
    irrigation_item_subcontent3: {
      type: String,
      required: true
    },
    irrigation_item_subcontent4: {
      type: String,
      required: true
    },
    irrigation_item_subcontent5: {
      type: String,
      required: true
    },
    monitoring_title: {
      type: String,
      required: true
    },
    monitoring_content: {
      type: String,
      required: true
    },
    monitoring_subcontent1: {
      type: String,
      required: true
    },
    monitoring_subtitle: {
      type: String,
      required: true
    },
    monitoring_subcontent2: {
      type: String,
      required: true
    },
    cultivation_title: {
      type: String,
      required: true
    },
    cultivation_content: {
      type: String,
      required: true
    },
    cultivation_subcontent1: {
      type: String,
      required: true
    },
    cultivation_subtitle1: {
      type: String,
      required: true
    },
    cultivation_subcontent2: {
      type: String,
      required: true
    },
    cultivation_subtitle2: {
      type: String,
      required: true
    },
    cultivation_subcontent3: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Commercial", commercialSchema);
