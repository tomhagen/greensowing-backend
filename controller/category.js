const slugify = require("slugify");
const Category = require("../models/category");
const Post = require("../models/post");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    Post.find({ categories: category })
      .populate("categories", "_id name slug")
      .select("_id title slug excerpt categories createdAt updatedAt")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json({ categories: category, posts: data });
      });
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: "Category deleted successfully" });
  });
};
