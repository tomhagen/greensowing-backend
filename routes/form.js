const express = require("express");
const router = express.Router();
const {
  contactForm,
  list,
  remove,
  orderContactForm
} = require("../controller/form");
const { requireSignin, adminMiddleware } = require("../controller/auth");
const {
  contactFormValidator,
  orderContactFormValidator
} = require("../validator/form");
const { runValidation } = require("../validator/index");

router.post("/contact", contactFormValidator, runValidation, contactForm);
router.post(
  "/contact-order",
  orderContactFormValidator,
  runValidation,
  orderContactForm
);
router.get("/contacts", requireSignin, adminMiddleware, list);
router.delete("/contact/:id", requireSignin, adminMiddleware, remove);

module.exports = router;
