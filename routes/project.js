const express = require("express");
const router = express.Router();

const { get, create, update } = require("../controller/project");
const { requireSignin, adminMiddleware } = require("../controller/auth");

router.get("/project", get);
router.post("/project", create);
router.put("/project", requireSignin, adminMiddleware, update);

module.exports = router;
