const Post = require("../models/post");
const Tag = require("../models/tag");
const Category = require("../models/category");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");
const { smartTrim } = require("../helpers/post");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not upload" });
    }

    const { title, body, tags, categories } = fields;
    if (!title || !title.length) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!body || body.length < 300) {
      return res.status(400).json({ error: "The content is too short" });
    }
    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: "Category is required" });
    }
    if (!tags || tags.length === 0) {
      return res.status(400).json({ error: "At least one tag is required" });
    }

    let post = new Post();
    post.title = title;
    post.body = body;
    post.excerpt = smartTrim(body, 200, " ", "...");
    post.slug = slugify(title).toLowerCase();
    post.mtitle = `${title} - ${process.env.APP_NAME}`;
    post.mdesc = stripHtml(body.substring(0, 160));

    // Handle categories and tags
    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");

    if (files.photo) {
      if (files.photo.size > 20000000) {
        // ~ 2MB
        return res.status(400).json({ error: "Image should be less than 2MB" });
      }
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;

      post.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        } else {
          // Push category to array
          Post.findByIdAndUpdate(
            result._id,
            {
              $push: { categories: arrayOfCategories }
            },
            {
              new: true
            }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({ error: errorHandler(err) });
            } else {
              // Push tag to array
              Post.findByIdAndUpdate(
                result._id,
                { $push: { tags: arrayOfTags } },
                { new: true }
              ).exec((err, result) => {
                if (err) {
                  return res.status(400).json({ error: errorHandler(err) });
                } else {
                  res.json(result);
                }
              });
            }
          });
        }
      });
    } else {
      return res.status(400).json({ error: "Image is required" });
    }
  });
};

exports.list = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 12;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Post.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("_id categories tags slug title excerpt createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: "error" });
      }
      res.json(data);
    });
};

exports.listPostWithCategory = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let slug = req.body.slug;
  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    Post.find({ categories: category })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select("_id title slug excerpt createdAt updatedAt")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json(data);
      });
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Post.findOne({ slug })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .select(
      "_id categories tags slug title body mtitle mdesc excerpt createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Post.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: "Post deleted successfully" });
  });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Post.findOne({ slug }).exec((err, oldPost) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload"
        });
      }
      let slugBeforeMerge = oldPost.slug;
      oldPost = _.merge(oldPost, fields);
      oldPost.slug = slugBeforeMerge;

      const { title, body, categories, tags } = fields;

      if (!body || body.length < 200) {
        return res.status(400).json({ error: "The content is too short" });
      } else {
        oldPost.excerpt = smartTrim(body, 200, " ", "...");
        oldPost.mdesc = stripHtml(body.substring(0, 160));
      }

      if (categories) {
        oldPost.categories = categories.split(",");
      }
      if (tags) {
        oldPost.tags = tags.split(",");
      }
      if (files.photo) {
        if (files.photo.size > 20000000) {
          return res
            .status(400)
            .json({ error: "Image should be less than 2MB" });
        }
        oldPost.photo.data = fs.readFileSync(files.photo.path);
        oldPost.photo.contentType = files.photo.type;
      }

      oldPost.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json(result);
      });
    });
  });
};
exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Post.findOne({ slug })
    .select("photo")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ error: errorHandler });
      }
      res.set("Content-Type", post.photo.contentType);
      return res.send(post.photo.data);
    });
};
