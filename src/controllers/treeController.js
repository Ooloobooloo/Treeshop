const treeService = require('../services/treeService');

exports.getAllTrees = async (req, res) => {
    try {
        const trees = await treeService.getAllTrees(); // Gọi service [cite: 58]
        res.render('index', { trees, error: null });
    } catch (err) {
        res.status(200).render('index', { trees: [], error: 'Database offline - UI only mode.' });
    }
};

exports.addTree = async (req, res) => {
    const { treename, description, image } = req.body;
    
    // Validate input: Ensure mandatory fields are present
    if (!treename || !description) {
        let trees = [];
        try {
            trees = await treeService.getAllTrees();
        } catch (e) {
            trees = [];
        }
        return res.status(400).render('index', { trees, error: 'Tree Name and Description are required!' });
    }

    try {
        await treeService.createTree({ treename, description, image }); // Gọi service [cite: 55]
        res.redirect('/');
    } catch (err) {
        const trees = await treeService.getAllTrees();
        res.status(503).render('index', { trees, error: err.message });
    }
};

exports.resetAll = async (req, res) => {
    try {
        await treeService.deleteAllTrees(); // Gọi service [cite: 59]
        res.redirect('/');
    } catch (err) {
        const trees = await treeService.getAllTrees();
        res.status(503).render('index', { trees, error: err.message });
    }
};