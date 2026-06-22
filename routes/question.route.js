const express = require('express');

const router = express.Router();

const {
    AjouterQuestion,
    GetQuestions
} = require('../controllers/question.controller');

// ==========================
// AJOUTER UNE QUESTION
// POST : /api/question/ajouter
// ==========================
router.post('/ajouter', AjouterQuestion);

// ==========================
// AFFICHER TOUTES LES QUESTIONS
// GET : /api/question
// ==========================
router.get('/', GetQuestions);

module.exports = router;