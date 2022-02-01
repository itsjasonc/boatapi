const router = require('express').Router();
const { swimlaneController } = require('../controllers');

router.post("/swimlane", swimlaneController.save);
router.get("/swimlane", swimlaneController.find);
router.get("/swimlane/:id", swimlaneController.findOne);
router.patch("/swimlane/:id", swimlaneController.update);
router.delete("/swimlane/:id", swimlaneController.destroy);

module.exports = router;
