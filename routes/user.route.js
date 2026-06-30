const express = require("express");

const router = express.Router();

const {
  inscription,
  connexion,
  profil
} = require("../controllers/user.controller");

const auth = require("../middleware/user.middleware");

// Inscription
router.post("/inscription", inscription);

// Connexion
router.post("/connexion", connexion);

// Profil
router.get("/profil", auth, profil);

module.exports = router;