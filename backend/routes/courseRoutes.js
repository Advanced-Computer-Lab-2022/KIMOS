const express = require("express");
const router = express.Router();
const { findCourse, findSubjects } = require("../controllers/courseController");

router.get("/subjects", findSubjects);
router.post("/findCourse", findCourse);

module.exports = router;
