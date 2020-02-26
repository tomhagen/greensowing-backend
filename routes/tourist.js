const express = require("express");
const router = express.Router();

const { get, create, update } = require("../controller/tourist");
const { requireSignin, adminMiddleware } = require("../controller/auth");

router.get("/tourist", get);
router.post("/tourist", create);
router.put("/tourist", requireSignin, adminMiddleware, update);

module.exports = router;
