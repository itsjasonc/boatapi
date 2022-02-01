const router = require('express').Router();
const { boatController } = require('../controllers');

router.post("/boat", boatController.save);
router.get("/boat", boatController.find);
router.get("/boat/:id", boatController.findOne);
router.patch("/boat/:id", boatController.update);
router.delete("/boat/:id", boatController.destroy);

module.exports = router;
