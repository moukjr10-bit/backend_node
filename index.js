const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// DB
const connectBD = require('./config/db');

// Routes
const userRoute = require('./routes/user.route');
const questionRoute = require('./routes/question.route');

// connexion mongodb
connectBD();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://front-node-azure.vercel.app'
    ],
    credentials: true
  })
);

// routes
app.use('/api/auth', userRoute);

app.use('/api/question', questionRoute);

// test
app.get('/', (req, res) => {
  res.send('Bienvenue sur Mini Stack Overflow');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur ${PORT}`);
});