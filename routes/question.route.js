const express = require("express");

const router = express.Router();

const {
  AjouterQuestion,
  GetQuestions,
  GetUneQuestion,
  AjouterReponse
} = require("../controllers/question.controller");

// Middleware pour reconnaître le token
const userMiddleware = require("../middleware/user.middleware");

// ==========================
// AJOUTER UNE QUESTION
// POST : /api/question
// ==========================
router.post("/", userMiddleware, AjouterQuestion);

// ==========================
// AFFICHER TOUTES LES QUESTIONS
// GET : /api/question
// ==========================
router.get("/", GetQuestions);

// ==========================
// AJOUTER UNE RÉPONSE
// POST : /api/question/:id/reponse
// ==========================
router.post("/:id/reponse", userMiddleware, AjouterReponse);

// ==========================
// AFFICHER UNE QUESTION
// GET : /api/question/:id
// ==========================
router.get("/:id", GetUneQuestion);

module.exports = router;