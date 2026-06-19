const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Configuration
dotenv.config();

// Connexion MongoDB
const connectBD = require('./config/db');

// Routes
const userRoute = require('./routes/user.route');
const questionRoute = require('./routes/question.route');

// Initialisation Express
const app = express();

// Connexion à la base de données
connectBD();

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://front-node-azure.vercel.app'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
);

// ==========================
// ROUTES
// ==========================

// Authentification
app.use('/api/auth', userRoute);

// Questions
app.use('/api/question', questionRoute);

// Route de test
app.get('/', (req, res) => {
    res.status(200).send('Bienvenue sur Mini Stack Overflow');
});

// ==========================
// LANCEMENT DU SERVEUR
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        ` Serveur démarré sur http://localhost:${PORT}`
    );
});