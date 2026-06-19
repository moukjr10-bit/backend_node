const express = require('express');
const userRoute = express.Router();

const { inscription, connexion } = require('../controllers/user.controller');

// ROUTES
userRoute.post('/inscription', inscription);
userRoute.post('/connexion', connexion);

module.exports = userRoute;