const { recommendations, chat, save_worker, upload } = require('../controllers/llm');

const router = require('express').Router();

router.post("/recommendations", recommendations);
router.post("/chat", chat);
router.post("/save-worker", upload.single("profile_picture"), save_worker);

module.exports = router;