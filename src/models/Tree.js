const mongoose = require('mongoose');


const treeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },  
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    
    
    timestamp: {
        type: Date,
        default: Date.now,
    }
});



module.exports = mongoose.model('Tree', treeSchema);
    