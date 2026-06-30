const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const connectBD = require("./config/db");
connectBD();

app.use(express.json());

app.use(cors());

const userRoute = require("./routes/user.route");
const questionRoute = require("./routes/question.route");
const reponseRoute = require("./routes/reponse.route");

app.use("/api/auth", userRoute);
app.use("/api/question", questionRoute);
app.use("/api/reponse", reponseRoute);

app.get("/", (req, res) => {
  res.send("Bienvenue sur Mini Stack Overflow");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});