const Project = require("../models/project");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const {
    step1_title,
    step1_content,
    step1_subcontent,
    step2_title,
    step2_content,
    step2_subcontent,
    step3_title,
    step3_content,
    step3_subcontent,
    step4_title,
    step4_subcontent,
    step5_title,
    step5_subcontent
  } = req.body;
  let project = new Project({
    step1_title,
    step1_content,
    step1_subcontent,
    step2_title,
    step2_content,
    step2_subcontent,
    step3_title,
    step3_content,
    step3_subcontent,
    step4_title,
    step4_subcontent,
    step5_title,
    step5_subcontent
  });
  project.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.get = (req, res) => {
  Project.findOne({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  const {
    step1_title,
    step1_content,
    step1_subcontent,
    step2_title,
    step2_content,
    step2_subcontent,
    step3_title,
    step3_content,
    step3_subcontent,
    step4_title,
    step4_subcontent,
    step5_title,
    step5_subcontent
  } = req.body;
  Project.updateOne(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};
