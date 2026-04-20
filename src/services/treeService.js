const Tree = require('../models/Tree');
const mongoose = require('mongoose');

function isDbReady() {
    return mongoose.connection.readyState === 1;
}

// Create a new tree
async function createTree(treeData) {
    if (!isDbReady()) {
        throw new Error('Database is offline. UI-only mode is active.');
    }
    const tree = new Tree(treeData);
    return await tree.save();
}

// Retrieve all trees
async function getAllTrees() {
    if (!isDbReady()) {
        return [];
    }
    return await Tree.find();
}

// Retrieve a specific tree by ID
async function getTreeById(id) {
    if (!isDbReady()) {
        return null;
    }
    return await Tree.findById(id);
}

// Update a tree by ID
async function updateTree(id, treeData) {
    if (!isDbReady()) {
        throw new Error('Database is offline. UI-only mode is active.');
    }
    return await Tree.findByIdAndUpdate(id, treeData, { new: true });
}

// Delete a tree by ID
async function deleteTree(id) {
    if (!isDbReady()) {
        throw new Error('Database is offline. UI-only mode is active.');
    }
    return await Tree.findByIdAndDelete(id);
}

async function deleteAllTrees() {
    if (!isDbReady()) {
        throw new Error('Database is offline. UI-only mode is active.');
    }
    return await Tree.deleteMany({});
}

module.exports = {
    createTree,
    getAllTrees,
    getTreeById,
    updateTree,
    deleteTree,
    deleteAllTrees,
};  