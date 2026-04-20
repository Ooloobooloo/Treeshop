const treeService = require('../services/treeService');

exports.getAllTrees = async (req, res) => {
    try {
        const trees = await treeService.getAllTrees(); // Gọi service [cite: 58]
        res.render('tree-list', { trees, error: null });
    } catch (err) {
        res.status(200).render('tree-list', { trees: [], error: 'Database offline - UI only mode.' });
    }
};

exports.addTree = async (req, res) => {
    const { name, description, image } = req.body;
    
    // Validate input: Ensure mandatory fields are present
    if (!name || !description) {
        const trees = await treeService.getAllTrees();
        return res.status(400).render('tree-list', { trees, error: 'Tree name and description are required.' });
    }

    try {
        await treeService.createTree({ name, description, image }); // Gọi service [cite: 55]
        res.redirect('/');
    } catch (err) {
        const trees = await treeService.getAllTrees();
        res.status(503).render('tree-list', { trees, error: err.message });
    }
};

exports.resetAll = async (req, res) => {
    try {
        await treeService.deleteAllTrees(); // Gọi service [cite: 59]
        res.redirect('/');
    } catch (err) {
        const trees = await treeService.getAllTrees();
        res.status(503).render('tree-list', { trees, error: err.message });
    }
};