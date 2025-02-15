const { recommendations, chat, save_worker, upload, createModule } = require('../controllers/llm');

const router = require('express').Router();

router.post("/recommendations", recommendations);
router.post("/chat", chat);
router.post("/save-worker", upload.single("profile_picture"), save_worker);
router.post("/create-module", createModule);

module.exports = router;