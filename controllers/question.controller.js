const Question = require('../models/question.model');

// ==========================
// AJOUTER UNE QUESTION
// ==========================
exports.AjouterQuestion = async (req, res) => {

    try {

        const {
            titre,
            description,
            tag,
            auteur
        } = req.body;

        // Vérification des champs
        if (
            !titre ||
            !description ||
            !tag ||
            !auteur
        ) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires'
            });
        }

        // Création de la question
        const question = await Question.create({
            titre,
            description,
            tag,
            auteur
        });

        res.status(201).json({
            message: 'Question créée avec succès',
            question
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Erreur serveur'
        });

    }
};

// ==========================
// AFFICHER TOUTES LES QUESTIONS
// ==========================
exports.GetQuestions = async (req, res) => {

    try {

        const questions = await Question.find();

        res.status(200).json({
            total: questions.length,
            questions
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Erreur serveur'
        });

    }
};