const slugify = require("slugify");
const Tag = require("../models/tag");
const Post = require("../models/post");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.list = (req, res) => {
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.create = (req, res) => {
  const { name } = req.body;

  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });
  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    Post.find({ tags: tag })
      .populate("tags", "_id name slug")
      .select("_id title slug excerpt tags createdAt updatedAt")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json({ tags: tag, posts: data });
      });
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: "Tag deleted successfully" });
  });
};
