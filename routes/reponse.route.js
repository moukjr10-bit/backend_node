const express = require("express");

const router = express.Router();

const {
  AjouterReponse,
  GetReponsesParQuestion
} = require("../controllers/reponse.controller");

// Middleware token
const auth = require("../middleware/user.middleware");

// Ajouter une réponse : token obligatoire
router.post("/:questionId", auth, AjouterReponse);

// Voir les réponses d'une question : pas besoin de token
router.get("/:questionId", GetReponsesParQuestion);

module.exports = router;