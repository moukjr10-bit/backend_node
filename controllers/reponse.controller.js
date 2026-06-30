const Reponse = require("../models/reponse.model");
const Question = require("../models/question.model");

// ==========================
// AJOUTER UNE REPONSE
// POST /api/reponse/:questionId
// ==========================
exports.AjouterReponse = async (req, res) => {
  try {

    const { texte } = req.body;
    const { questionId } = req.params;

    if (!texte || texte.trim() === "") {
      return res.status(400).json({
        message: "La réponse est obligatoire."
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable."
      });
    }

    const reponse = await Reponse.create({
      question: questionId,
      auteur: req.user._id,
      texte: texte
    });

    const reponseComplete = await Reponse.findById(reponse._id)
      .populate("auteur", "prenom nom");

    return res.status(201).json({
      message: "Réponse publiée avec succès.",
      reponse: reponseComplete
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }
};


// ==========================
// AFFICHER LES REPONSES
// GET /api/reponse/:questionId
// ==========================
exports.GetReponsesParQuestion = async (req, res) => {

  try {

    const { questionId } = req.params;

    const reponses = await Reponse.find({
      question: questionId
    })
      .populate("auteur", "prenom nom")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      total: reponses.length,
      reponses
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }

};