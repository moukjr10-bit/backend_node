const Question = require('../models/question.model');

// CREATION
exports.AjouterQuestion = async (req, res) => {
 try {

   const {
     titre,
     description,
     tag,
     auteur
   } = req.body;

   if (
     !titre ||
     !description ||
     !tag ||
     !auteur
   ) {
     return res.status(400).json({
       message:
       'Tous les champs sont obligatoires'
     });
   }

   const question =
   await Question.create({

      titre,
      description,
      tag,
      auteur

   });

   res.status(201).json({
     message:
     'Question créée',

     question
   });

 } catch (error) {

   console.log(error);

   res.status(500).json({
     message:
     'Erreur serveur'
   });

 }
};