const mongoose = require("mongoose");

const homeSchema = mongoose.Schema(
  {
    carousel_title1: {
      type: String,
      required: true
    },
    carousel_subtitle1: {
      type: String,
      required: true
    },
    carousel_title2: {
      type: String,
      required: true
    },
    carousel_subtitle2: {
      type: String,
      required: true
    },
    carousel_title3: {
      type: String,
      required: true
    },
    carousel_subtitle3: {
      type: String,
      required: true
    },
    carousel_title4: {
      type: String,
      required: true
    },
    carousel_subtitle4: {
      type: String,
      required: true
    },
    about_title: {
      type: String,
      required: true
    },
    about_content: {
      type: String,
      required: true
    },
    about_subcontent: {
      type: String,
      required: true
    },
    product_title: {
      type: String,
      required: true
    },
    product_content: {
      type: String,
      required: true
    },
    product_greenhouse: {
      type: String,
      required: true
    },
    product_variety: {
      type: String,
      required: true
    },
    product_cultivation: {
      type: String,
      required: true
    },
    product_material: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Home", homeSchema);
