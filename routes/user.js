const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

// import controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  read,
  update,
  updateResume,
  updateExperience,
  getExperience,
} = require("../controllers/user");

// GET USER
router.get("/user/:id", requireSignin, read);

// GET EXPERIENCE
router.get("/user/:id/:experienceId", requireSignin, getExperience);

// USER UPDATE
router.put(
  "/user/update",
  requireSignin,
  [
    // must be a valid phone number
    body("phone").isMobilePhone().withMessage("Not a valid phone number."),
  ],
  update
);

// WORK EXPERIENCE UPDATE
router.put(
  "/user/update-experience",
  requireSignin,
  // [
  //   // Check Experience
  //   body("experience.*.company").not().isEmpty("Company is required"),
  //   body("experience.*.jobTitle").not().isEmpty("Job title is required"),
  //   body("experience.*.startDate").not().isEmpty("Start Date is required"),
  //   body("experience.*.endDate").not().isEmpty("End Date is required"),
  // ],
  updateExperience
);

// RESUME UPDATE
// router.put(
//   "/user/update-resume",
//   requireSignin,
//   [
//     // LinkedIn must be a URL
//     body("linkedIn")
//       .isURL()
//       .withMessage(
//         "Not a valid LinkedIn URL. Try copying and pasting your LinkedIn profile URL."
//       ),
//     // Website must be a URL
//     body("website")
//       .isURL()
//       .withMessage(
//         "Not a valid website URL. Try copying and pasting your website's URL."
//       ),
//     // GitHub must be a URL
//     body("github")
//       .isURL()
//       .withMessage(
//         "Not a valid GitHub URL. Try copying and pasting your GitHub URL."
//       ),
//   ],
//   updateResume
// );

router.put("/admin/update", requireSignin, adminMiddleware, update);

module.exports = router;
