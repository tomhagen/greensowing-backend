const express = require("express");
const router = express.Router();

const { list, create, read, remove } = require("../controller/tag");

router.get("/tags", list);
router.post("/tag", create);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", remove);

module.exports = router;
