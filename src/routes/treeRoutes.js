const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeControllers');

router.get('/', treeController.getAllTrees);

router.post('/trees', treeController.addTree);

// Chỉ giữ POST cho update
router.post('/trees/edit/:id', treeController.updateTree);

router.post('/trees/delete/:id', treeController.deleteTree);
router.post('/reset', treeController.resetAll);

module.exports = router;