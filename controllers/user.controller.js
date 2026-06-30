const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===========================
// INSCRIPTION
// ===========================
exports.inscription = async (req, res) => {
  try {
    const { prenom, nom, email, password } = req.body;

    // Vérification
    if (!prenom || !nom || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires."
      });
    }

    // Vérifier si le mail existe
    const existe = await User.findOne({ email });

    if (existe) {
      return res.status(400).json({
        message: "Cet email existe déjà."
      });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Création utilisateur
    const user = await User.create({
      prenom,
      nom,
      email,
      password: passwordHash
    });

    res.status(201).json({
      message: "Inscription réussie.",
      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

// ===========================
// CONNEXION
// ===========================
exports.connexion = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires."
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Utilisateur introuvable."
      });
    }

    const verifier = await bcrypt.compare(password, user.password);

    if (!verifier) {
      return res.status(400).json({
        message: "Mot de passe incorrect."
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Connexion réussie.",

      token,

      user: {
        id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur serveur."
    });

  }
};

// ===========================
// PROFIL
// ===========================
exports.profil = async (req, res) => {

  try {

    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur serveur."
    });

  }

};