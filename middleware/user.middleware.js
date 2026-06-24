const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Accès refusé. Token absent."
    });
  }

  try {
    const vraiToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(
      vraiToken,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable."
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Token invalide ou expiré."
    });
  }
};