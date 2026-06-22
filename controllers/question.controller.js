const Question = require("../models/question.model");

// ==========================
// AJOUTER UNE QUESTION
// ==========================
exports.AjouterQuestion = async (req, res) => {
  try {
    const { titre, description, tag } = req.body;

    // auteur ne vient plus du frontend
    // il vient de l'utilisateur reconnu par le token
    if (!titre || !description || !tag) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires"
      });
    }

    const question = await Question.create({
      titre,
      description,
      tag,
      auteur: req.user._id
    });

    res.status(201).json({
      message: "Question créée avec succès",
      question
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// ==========================
// AFFICHER TOUTES LES QUESTIONS
// ==========================
exports.GetQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("auteur", "prenom nom")
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: questions.length,
      questions: questions
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// ==========================
// AFFICHER UNE QUESTION
// ==========================
exports.GetUneQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("auteur", "prenom nom")
      .populate("reponse.user", "prenom nom");

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable"
      });
    }

    res.status(200).json({
      question: question
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};