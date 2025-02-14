const router = require('express').Router();
const { getCourse, createCourse, getModule } = require("../controllers/course");

router.get("/course", getCourse);
router.post("/add-course", createCourse);
router.get("/module", getModule);

module.exports = router;