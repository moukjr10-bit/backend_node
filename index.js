const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectBD = require('./config/db');
const userRoute = require('./routes/user.route');

dotenv.config();

const app = express();

connectBD();

app.use(express.json());

// CORRECTION
app.use(
    cors({
        origin: [
            "http://localhost:5173", // Vite
            "https://front-node-azure.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

// routes
app.use('/api/auth', userRoute);

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `serveur démarré sur http://localhost:${PORT}`
    );
});