const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      min: 8,
      unique: true,
      index: true,
      lowercase: true
    },
    hased_password: {
      type: String,
      required: true,
      min: 10
    },
    role: {
      type: Number,
      default: 0
    },
    salt: String
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    // Note: don't use arrow function
    // Create a temporary variable called password
    this._password = password;
    this.salt = this.makeSalt();
    this.hased_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hased_password;
  },
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};
module.exports = mongoose.model("User", userSchema);
