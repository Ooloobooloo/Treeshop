const Tree = require('../models/Tree');

// Create a new tree
async function createTree(treeData) {
    const tree = new Tree(treeData);
    return await tree.save();
}

// Retrieve all trees
async function getAllTrees() {
    return await Tree.find();
}

// Retrieve a specific tree by ID
async function getTreeById(id) {
    return await Tree.findById(id);
}

// Update a tree by ID
async function updateTree(id, treeData) {
    return await Tree.findByIdAndUpdate(id, treeData, { new: true });
}

// Delete a tree by ID
async function deleteTree(id) {
    return await Tree.findByIdAndDelete(id);
}

module.exports = {
    createTree,
    getAllTrees,
    getTreeById,
    updateTree,
    deleteTree,
};  