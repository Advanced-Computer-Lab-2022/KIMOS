const express = require("express");
const router = express.Router();
const { findCourse } = require("../controllers/courseController");
const { changeCountry, getCountry } = require("../controllers/allController");

router.post("/changeCountry", changeCountry);
router.get("/country", getCountry);


module.exports = router;
