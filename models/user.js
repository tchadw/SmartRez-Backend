const mongoose = require("mongoose");
const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    linkedIn: {
      type: String,
      maxlength: 150,
      trim: true,
    },
    website: {
      type: String,
      maxlength: 150,
      trim: true,
    },
    github: {
      type: String,
      maxlength: 150,
      trim: true,
    },
    experience: [
      {
        company: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        responsibilities: Array,
      },
    ],
    internships: [
      {
        company: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        responsibilities: Array,
      },
    ],
    volunteer: [
      {
        company: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        responsibilities: Array,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        startDate: String,
        endDate: String,
      },
    ],
    certifications: [
      {
        name: String,
        from: String,
      },
    ],
    projects: [
      {
        name: String,
        startDate: String,
        endDate: String,
        responsibilities: Array,
      },
    ],
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "subscriber",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

// virtual
userScheama
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userScheama.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // true false
  },

  encryptPassword: function (password) {
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

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userScheama);
