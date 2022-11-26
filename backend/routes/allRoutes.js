const express = require("express");
const router = express.Router();
const { findCourse } = require("../controllers/courseController");
const { changeCountry, getCountry, getRate } = require("../controllers/allController");

router.post("/changeCountry", changeCountry);
router.get("/country", getCountry);
router.post("/rate", getRate)


module.exports = router;
