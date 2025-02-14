const router = require('express').Router();
const { getUser, getWorker, leaderboard, getProvider } = require("../controllers/user");

router.post("/user", getUser);
router.post("/worker", getWorker);
router.post("/provider", getProvider);
router.get("/leaderboard", leaderboard);

module.exports = router;