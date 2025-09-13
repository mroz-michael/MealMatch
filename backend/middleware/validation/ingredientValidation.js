
/**
 * sanitize and validate inputted values before passing off to controller
 * User will be added by auth middleware, don't check for it here 
 */

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 30

//ensure ingredient name is valid and user making request is authenticated
const validateIngredientForDB = (req, res, next) => {

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

//validate the ingredient before adding it to user's stock array
//fields to validate are: name, portions, portionCost, expiryDate
const validateIngredientForUser = (req, res, next) => {
    if (!req.user) {
       return res.status(401).json({error: "User not found"});
    }

        const {name, portions, portionCost, expiryDate} = req.body;

    if (! (req.body && name && portions && portionCost && expiryDate)  ) {
        return res.status(400).json({error: "Request missing required data"});
    }

    const validName = validateName(name);
    const validPortions = validatePortions(portions);
    const validPortionCost = validatePortionCost(portionCost);
    const validExpiryDate = validateExpiryDate(expiryDate);

    if (! (validName && validPortions && validPortionCost && validExpiryDate) ) {
        return res.status(400).json({error: "Invalid request data"});
    }

}


const validateName = (name) => {
    const isString = typeof name === "string";

    if (!isString) {
        return false;
    }

    return name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH;
}

//ensure portions are non-negative number
const validatePortions = (portions) => {
    const isNum = typeof portions === "number" && !isNaN(portions)
    return isNum && portions >= 0
}

const validatePortionCost = (portionCost) => {
    //as of now, validation logic is same as portions field. keep this function incase validation logic changes in future
    return validatePortions(portionCost);
}

//ensure expiryDate is a string in a valid date format
const validateExpiryDate = (expiryDate) => {
    const isDate = !isNaN(Date.parse(expiryDate));

    return isDate && typeof expiryDate === "string";
}

module.exports = { validateIngredientForDB, validateIngredientForUser }