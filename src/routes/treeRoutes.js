const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeControllers');
// Home page - list all trees
router.get('/', treeController.getAllTrees);


// Create tree
router.post('/trees', treeController.addTree);
 
// Reset all trees
router.post('/reset', treeController.resetAll);
 
module.exports = router;
 