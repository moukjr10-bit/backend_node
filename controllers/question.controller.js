const Question = require('../models/question.model');

// CREATION
exports.AjouterQuestion = async (req, res) => {
  try {
    const { titre, description } = req.body;

    if (!titre || !description) {
      return res.status(400).json({
        message: 'Tous les champs sont obligatoires',
      });
    }

    const question = await Question.create({
      titre,
      description,
    });

    res.status(201).json({
      message: 'Question créée',
      question,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Erreur serveur',
    });
  }
};

// AFFICHAGE
exports.GetQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Erreur serveur',
    });
  }
};

// MODIFICATION
exports.ModifierQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const { titre, description } = req.body;

    const question = await Question.findByIdAndUpdate(
      id,
      { titre, description },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        message: 'Question introuvable',
      });
    }

    res.status(200).json({
      message: 'Question modifiée',
      question,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Erreur serveur',
    });
  }
};

// SUPPRESSION
exports.SupprimerQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        message: 'Question introuvable',
      });
    }

    res.status(200).json({
      message: 'Question supprimée',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Erreur serveur',
    });
  }
};