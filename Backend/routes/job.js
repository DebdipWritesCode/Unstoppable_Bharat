const router = require('express').Router();

const { createJob, applyJob } = require("../controllers/job");

router.post("/create-job", createJob);
router.post("/apply-job", applyJob);

module.exports = router;