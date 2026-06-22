const express = require('express');

const router = express.Router();

const {
  AjouterQuestion,
  GetQuestions,
  GetUneQuestion
} = require('../controllers/question.controller');

// Ajouter une question
router.post('/ajouter', AjouterQuestion);

// Afficher toutes les questions
router.get('/', GetQuestions);

// Afficher une seule question avec son id
router.get('/:id', GetUneQuestion);

module.exports = router;