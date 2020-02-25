const express = require("express");
const router = express.Router();
const {
  list,
  listPostWithCategory,
  create,
  read,
  remove,
  photo,
  update
} = require("../controller/post");
const {
  requireSignin,
  adminMiddleware,
  authMiddleware
} = require("../controller/auth");

router.post("/post", requireSignin, adminMiddleware, create);
router.post("/posts", list);
router.post("/posts-categories", listPostWithCategory);
router.get("/post/:slug", read);
router.delete("/post/:slug", requireSignin, adminMiddleware, remove);
router.get("/post/photo/:slug", photo);
router.put("/post/:slug", update);

module.exports = router;
