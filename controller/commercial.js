const Commercial = require("../models/commercial");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const {
    covering_title,
    covering_content,
    covering_subcontent1,
    covering_subtitle,
    covering_subcontent2,
    structure_title,
    structure_content,
    structure_subcontent1,
    structure_subtitle1,
    structure_subtitle2,
    structure_subcontent2,
    structure_subcontent3,
    irrigation_title,
    irrigation_subcontent,
    irrigation_item_subcontent1,
    irrigation_item_subcontent2,
    irrigation_item_subcontent3,
    irrigation_item_subcontent4,
    irrigation_item_subcontent5,
    monitoring_title,
    monitoring_content,
    monitoring_subcontent1,
    monitoring_subtitle,
    monitoring_subcontent2,
    cultivation_title,
    cultivation_content,
    cultivation_subcontent1,
    cultivation_subtitle1,
    cultivation_subcontent2,
    cultivation_subtitle2,
    cultivation_subcontent3
  } = req.body;
  let commercial = new Commercial({
    covering_title,
    covering_content,
    covering_subcontent1,
    covering_subtitle,
    covering_subcontent2,
    structure_title,
    structure_content,
    structure_subcontent1,
    structure_subtitle1,
    structure_subtitle2,
    structure_subcontent2,
    structure_subcontent3,
    irrigation_title,
    irrigation_subcontent,
    irrigation_item_subcontent1,
    irrigation_item_subcontent2,
    irrigation_item_subcontent3,
    irrigation_item_subcontent4,
    irrigation_item_subcontent5,
    monitoring_title,
    monitoring_content,
    monitoring_subcontent1,
    monitoring_subtitle,
    monitoring_subcontent2,
    cultivation_title,
    cultivation_content,
    cultivation_subcontent1,
    cultivation_subtitle1,
    cultivation_subcontent2,
    cultivation_subtitle2,
    cultivation_subcontent3
  });
  commercial.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.get = (req, res) => {
  Commercial.findOne({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  const {
    covering_title,
    covering_content,
    covering_subcontent1,
    covering_subtitle,
    covering_subcontent2,
    structure_title,
    structure_content,
    structure_subcontent1,
    structure_subtitle1,
    structure_subtitle2,
    structure_subcontent2,
    structure_subcontent3,
    irrigation_title,
    irrigation_subcontent,
    irrigation_item_subcontent1,
    irrigation_item_subcontent2,
    irrigation_item_subcontent3,
    irrigation_item_subcontent4,
    irrigation_item_subcontent5,
    monitoring_title,
    monitoring_content,
    monitoring_subcontent1,
    monitoring_subtitle,
    monitoring_subcontent2,
    cultivation_title,
    cultivation_content,
    cultivation_subcontent1,
    cultivation_subtitle1,
    cultivation_subcontent2,
    cultivation_subtitle2,
    cultivation_subcontent3
  } = req.body;
  Commercial.updateOne(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};
