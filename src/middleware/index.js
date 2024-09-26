// all middleware gets (req, res, next)

const { check } = require("express-validator");

const checkPasswordStrength = (req, res, next) => {
  try {
    const { password } = req.body;
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = '!@#$%^&*()_+-=[]{};\\:"|,.<>/?';

    // loop through each character in password
    // if at the end we don't have at least 1 of each, reject
    let hasUppercase = false;
    let hasSymbol = false;

    for (let i = 0; i < password.length; i++) {
      if (uppercaseLetters.includes(password[i])) {
        hasUppercase = true;
      } else if (symbols.includes(password[i])) {
        hasSymbol = true;
      }

      if (hasUppercase && hasSymbol) {
        next();
        return;
      }
    }

    throw new Error("Password must contain at least 1 upper, 1 symbol");
  } catch (error) {
    next(error);
  }
};

module.exports = {
    checkPasswordStrength
}
