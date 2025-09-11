
/**
 * sanitize and validate inputted values before passing off to controller
 * User will be added by auth middleware, don't check for it here 
 */

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 30

//ensure user making request has create priviledges and ingredient name is valid
const validateIngredient = (req, res, next) => {

    if (!req.user) {
        res.status(404).json({error: "User not found"});
        return;
    }
    
    const user = req.user;


    if (! (user.isAdmin || user.canCreate)) {
        res.status(401).json({error: "User does not have access to perform requested operation"});
        return;
    }

    const name = req.body.name;

    if (! (req.body && name)  ) {
        res.status(400).json({error: "Request missing required data"});
        return;
    }

    const validName = validateName(name);

    if (!validName) {
        res.status(400).json({error: "Invalid request data"})
        return;
    }

    next();
}

const validateName = (name) => {
    const isString = typeof name === "string";

    if (!isString) {
        return false;
    }

    return name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH;
}

module.exports = { validateIngredient }