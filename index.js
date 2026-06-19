const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectBD = require('./config/db');

const userRoute = require('./routes/user.route');
const questionRoute = require('./routes/question.route');

dotenv.config();

const app = express();

// Connexion MongoDB
connectBD();

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://front-node-azure.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

// Routes Authentification
app.use('/api/auth', userRoute);

// Routes Questions
app.use('/api/question', questionRoute);

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur');
});

// Démarrage serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Serveur démarré sur http://localhost:${PORT}`
    );
});