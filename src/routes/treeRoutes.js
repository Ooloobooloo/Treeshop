const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeController');
// Home page - list all trees
router.get('/', treeController.getAllTrees);


// Create tree
router.post('/trees', treeController.createTree);
 
// Edit form
router.get('/trees/:id/edit', treeController.editForm);
 
// Update tree (POST since HTML forms don't support PUT)
router.post('/trees/:id/update', treeController.updateTree);
 
// Delete single tree
router.post('/trees/:id/delete', treeController.deleteTree);
 
// Reset all trees
router.post('/reset', treeController.deleteAllTrees);
 
module.exports = router;
 