const express = require("express");
const router = express.Router();
const { list, create, read, remove } = require("../controller/category");
const {
  requireSignin,
  adminMiddleware,
  authMiddleware
} = require("../controller/auth");

router.get("/categories", list);
router.post("/category", requireSignin, adminMiddleware, create);
router.get("/category/:slug", read);
router.delete("/category/:slug", remove);
module.exports = router;
