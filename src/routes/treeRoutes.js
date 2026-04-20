const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeControllers');

// Home page - list all trees
router.get('/', treeController.getAllTrees);

// Create tree
router.post('/trees', treeController.addTree);

// Edit tree (form)
router.get('/trees/edit/:id', treeController.getEditForm);

// Update tree
router.post('/trees/edit/:id', treeController.updateTree);

// Delete tree
router.post('/trees/delete/:id', treeController.deleteTree);

// Reset all trees
router.post('/reset', treeController.resetAll);

module.exports = router;