const express = require("express");
const router = express.Router();
const {
  signup,
  requireSignin,
  signin,
  signout
} = require("../controller/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/secret", requireSignin, (req, res) => {
  res.json({ message: "hehe" });
});
module.exports = router;
