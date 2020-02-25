const express = require("express");
const router = express.Router();

const { get, create, update } = require("../controller/home");
const { requireSignin, adminMiddleware } = require("../controller/auth");

router.get("/home", get);
router.post("/home", create);
router.put("/home", requireSignin, adminMiddleware, update);

module.exports = router;
