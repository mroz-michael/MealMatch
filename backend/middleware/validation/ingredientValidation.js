
/**
 * sanitize and validate inputted values before passing off to controller
 * User will be added by auth middleware, don't check for it here 
 */

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 30

//ensure ingredient name is valid and user making request is authenticated
const validateIngredient = (req, res, next) => {

    if (!req.user) {
       return res.status(401).json({error: "User not found"});
    }

    const name = req.body.name;

    if (! (req.body && name)  ) {
        return res.status(400).json({error: "Request missing required data"});
    }

    const validName = validateName(name);

    if (!validName) {
        return res.status(400).json({error: "Invalid request data"});
    }

    next();
}

//make sure ingredient name meets schema requirements
const validateName = (name) => {
    const isString = typeof name === "string";

    if (!isString) {
        return false;
    }

    return name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH;
}

module.exports = { validateIngredient }