const treeService = require('../services/treeServices');

// ========== GET ALL TREES ==========
exports.getAllTrees = async (req, res) => {
    try {
        const trees = await treeService.getAllTrees();
        res.render('tree-list', { trees, error: null });
    } catch (err) {
        res.status(200).render('tree-list', { trees: [], error: 'Database offline - UI only mode.' });
    }
};

// ========== ADD TREE ==========
exports.addTree = async (req, res) => {
    const { name, description, image } = req.body;

    if (!name || !description) {
        const trees = await treeService.getAllTrees();
        return res.status(400).render('tree-list', { 
            trees, 
            error: 'Tree name and description are required.' 
        });
    }

    try {
        await treeService.createTree({ name, description, image });
        res.redirect('/');
    } catch (err) {
        const trees = await treeService.getAllTrees();
        res.status(503).render('tree-list', { trees, error: err.message });
    }
};

// ========== GET EDIT FORM (Quan trọng - sửa lỗi Cannot GET) ==========
exports.getEditForm = async (req, res) => {
    try {
        const tree = await treeService.getTreeById(req.params.id);
        
        if (!tree) {
            return res.redirect('/');
        }

        res.render('tree-edit', { tree, error: null });
    } catch (err) {
        console.error(err);
        res.status(503).render('tree-list', { 
            trees: [], 
            error: 'Không thể tải form chỉnh sửa.' 
        });
    }
};

// ========== UPDATE TREE ==========
exports.updateTree = async (req, res) => {
    const { name, description, image } = req.body;
    const id = req.params.id;

    if (!name || !description) {
        const tree = await treeService.getTreeById(id);
        return res.status(400).render('tree-edit', { 
            tree, 
            error: 'Tree name and description are required.' 
        });
    }

    try {
        await treeService.updateTree(id, { name, description, image });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const tree = await treeService.getTreeById(id);
        res.status(503).render('tree-edit', { 
            tree, 
            error: err.message || 'Cập nhật thất bại.' 
        });
    }
};

// ========== DELETE TREE ==========
exports.deleteTree = async (req, res) => {
    try {
        await treeService.deleteTree(req.params.id);
        res.redirect('/');
    } catch (err) {
        const trees = await treeService.getAllTrees();
        res.status(503).render('tree-list', { trees, error: err.message || 'Xóa thất bại.' });
    }
};

// ========== RESET ALL ==========
exports.resetAll = async (req, res) => {
    try {
        await treeService.deleteAllTrees();
        res.redirect('/');
    } catch (err) {
        const trees = await treeService.getAllTrees();
        res.status(503).render('tree-list', { trees, error: err.message });
    }
};