const express = require("express");
const router = express.Router();

const { get, create, update } = require("../controller/commercial");
const { requireSignin, adminMiddleware } = require("../controller/auth");

router.get("/commercial", get);
router.post("/commercial", create);
router.put("/commercial", requireSignin, adminMiddleware, update);

module.exports = router;
