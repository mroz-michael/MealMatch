const MINIMUM_PASSWORD_LENGTH = 8;

/**
 * 
 * validate incoming request to ensure it contains username and password
 */
const validateUserDetails = (req, res, next) => {
    if (! (req.body && req.body.username && req.body.password) ) {
        return res.status(400).json("Malformatted Request");
    }

    //more user-friendly error messages are left for the front end

    if (!validateUsername(req.body.username)) {
        return res.status(400).json("Invalid Credentials");
    }

    if (!validatePassword(req.body.password)) {
        return res.status(400).json("Invalid Credentials");
    }

    return next();
}

/**
 * determine if password is valid.
 * PW is valid if: 
 * at least 8 chars, at least 1 of each: uppercase, lowercase, digit, symbol
 * returns true if pw is valid, else false
 */
const validatePassword = (pw) => {
    const longEnough = pw.length >= MINIMUM_PASSWORD_LENGTH;
    const containsSymbol = /[^A-Za-z0-9]/.test(pw);
    const containsUpper = /[A-Z]/.test(pw);
    const containsLower = /[a-z]/.test(pw);
    const containsDigit = /[0-9]/.test(pw);

    return longEnough && containsSymbol && containsUpper && containsLower && containsDigit;
}

//internal helper function
const validateUsername = (username) => {
    return username && username.length > 1;
}

module.exports = {
    validateUserDetails,
    validatePassword
}