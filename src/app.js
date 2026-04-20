const express = require('express');
const mongoose = require('mongoose');


const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const treeRoutes = require('./routes/treeRoutes');
app.use('/', treeRoutes);






app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');









module.exports = app;   
