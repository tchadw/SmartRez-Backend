const User = require("../models/user");

const { body, validationResult } = require("express-validator");

const { response } = require("express");

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
    console.log(user);
  });
};

exports.getExperience = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(req.params["experienceId"]);
    //console.log(user.experience);
    console.log(req.params["experienceId"]);
  });

  /*const expId = req.params["experienceId"];
  const experience = User.experience;
  User.findById(experience.expId).exec((err, exp) => {
    if (err || !exp) {
      return res.status(400).json({
        error: "Job not not found",
      });
    }
    res.json("test");
    console.log("test"); 
  });*/
};

exports.update = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { name, phone, password } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }

    // Check errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Please enter valid phone number" });
    } else {
      user.phone = phone;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

exports.updateExperience = (req, res) => {
  const { experience } = req.body;

  // Set up model constructor
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (!experience.company) {
      return res.status(400).json({
        error: "Company name is required",
      });
    } else {
      user.experience.company = experience.company;
    }
    if (!experience.jobTitle) {
      return res.status(400).json({
        error: "Job title is required",
      });
    } else {
      user.experience.jobTitle = experience.jobTitle;
    }
    if (!experience.startDate) {
      return res.status(400).json({
        error: "Start date is required",
      });
    } else {
      user.experience.startDate = experience.startDate;
    }
    if (!experience.endDate) {
      return res.status(400).json({
        error: "End date is required",
      });
    } else {
      user.experience.endDate = experience.endDate;
    }

    // Check errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      console.log("Error: ", errors);
    }

    // Save
    user.experience.save((err, updatedExperienceInfo) => {
      if (err) {
        console.log("EXPERIENCE INFO UPDATE ERROR:", err);
        return res.status(400).json({
          error: "Experience update failed",
        });
      }
      console.log("EXPERIENCE BASIC INFO: ", req.body);
      res.json(updatedExperienceInfo);
    });
  });
};

// exports.updateResume = (req, res) => {
//   const {
//     linkedIn,
//     website,
//     github,
//     experience,
//     internships,
//     volunteer,
//     education,
//     certifications,
//     projects,
//   } = req.body;

//   // Set up model constructor
//   User.findOne({ _id: req.user._id }, (err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "User not found",
//       });
//     }

//     user.linkedIn = linkedIn;
//     user.website = website;
//     user.github = github;
//     user.experience = experience;
//     user.internships = internships;
//     user.volunteer = volunteer;
//     user.education = education;
//     user.certifications = certifications;
//     user.projects = projects;

//     // Check errors using express-validator
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//       console.log("Error: ", errors);
//     }

//     // Save
//     user.save((err, updatedResumeInfo) => {
//       if (err) {
//         console.log("RESUME INFO UPDATE ERROR:", err);
//         return res.status(400).json({
//           error: "Resume Info update failed",
//         });
//       }
//       console.log("RESUME BASIC INFO: ", req.body);
//       res.json(updatedResumeInfo);
//     });
//   });
// };
