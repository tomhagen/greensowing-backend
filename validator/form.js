const { check } = require("express-validator");

exports.contactFormValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
  check("phone")
    .isMobilePhone()
    .withMessage("Must be valid phone number"),
  check("email")
    .isEmail()
    .withMessage("Must be valid email address"),
  check("message")
    .not()
    .isEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long")
];

exports.orderContactFormValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
  check("phone")
    .isMobilePhone()
    .withMessage("Must be valid phone number"),
  check("email")
    .isEmail()
    .withMessage("Must be valid email address"),
  check("detail")
    .not()
    .isEmpty()
    .withMessage("Please choose a product to order"),
  check("message")
    .not()
    .isEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long")
];
