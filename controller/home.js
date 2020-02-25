const Home = require("../models/home");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const {
    carousel_title1,
    carousel_subtitle1,
    carousel_title2,
    carousel_subtitle2,
    carousel_title3,
    carousel_subtitle3,
    carousel_title4,
    carousel_subtitle4,
    about_title,
    about_content,
    about_subcontent
  } = req.body;
  let home = new Home({
    carousel_title1,
    carousel_subtitle1,
    carousel_title2,
    carousel_subtitle2,
    carousel_title3,
    carousel_subtitle3,
    carousel_title4,
    carousel_subtitle4,
    about_title,
    about_content,
    about_subcontent
  });
  home.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.get = (req, res) => {
  Home.findOne({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  const {
    carousel_title1,
    carousel_subtitle1,
    carousel_title2,
    carousel_subtitle2,
    carousel_title3,
    carousel_subtitle3,
    carousel_title4,
    carousel_subtitle4,
    about_title,
    about_content,
    about_subcontent,
    product_title,
    product_content,
    product_greenhouse,
    product_variety,
    product_cultivation,
    product_material
  } = req.body;
  Home.updateOne(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};
