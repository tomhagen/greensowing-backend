const Tourist = require("../models/tourist");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const {
    unique_title,
    unique_content,
    unique_subcontent,
    creative_title,
    creative_content,
    creative_subcontent,
    functions_title,
    functions_content,
    functions_subcontent
  } = req.body;
  let tourist = new Tourist({
    unique_title,
    unique_content,
    unique_subcontent,
    creative_title,
    creative_content,
    creative_subcontent,
    functions_title,
    functions_content,
    functions_subcontent
  });
  tourist.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.get = (req, res) => {
  Tourist.findOne({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  const {
    unique_title,
    unique_content,
    unique_subcontent,
    creative_title,
    creative_content,
    creative_subcontent,
    functions_title,
    functions_content,
    functions_subcontent
  } = req.body;
  Tourist.updateOne(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};
