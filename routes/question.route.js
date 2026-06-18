const express =
require('express');

const {

AjouterQuestion,
GetQuestions

}

=

require(
'../controllers/question.controller'
);

const router =
express.Router();



// ajouter

router.post(
'/ajouter',
AjouterQuestion
);


// afficher

router.get(
'/',
GetQuestions
);

module.exports =
router;