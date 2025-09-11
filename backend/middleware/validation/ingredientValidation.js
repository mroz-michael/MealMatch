
/**
 * sanitize and validate inputted values before passing off to controller
 * 
 * Ingredient Schema: 
 *     name: 
     {
         type: String,
         required: true,
         minlength: 2,
         maxlength: 30
     },
     portionCost: 
     {
         type: Number, 
         required: true
     },
 
     portions: 
     {
         type: Number,
         required: true
     },
 
     expiryDate: { type: Date, required: true },
     
     user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
 * 
 * User will be added by auth middleware, don't check for it here 
 */

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 30

const validateIngredient = (req, res, next) => {

    const {name, portionCost, portions, expiryDate} = req.body;

    if (! (req.body && name && portionCost && portions && expiryDate)  ) {
        res.status(400).json({error: "Request missing required data"});
        return;
    }

    const validName = validateName(name);
    const validNumbers = validateNumbers([portionCost, portions])
    const validDate = validateDate(expiryDate)

    if (! (validName && validNumbers && validDate) ) {
        res.status(400).json({error: "Invalid request data"})
        return;
    }

    //ensure date is stored as a Date obj
    req.body.expiryDate = new Date(expiryDate);

    next();
}

const validateName = (name) => {
    const isString = typeof name === "string";

    if (!isString) {
        return false;
    }

    return name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH;
}

//validate each numeric field, nums is array of number type fields each needing validation
//each num should be valid number >= 0
const validateNumbers = (nums) => {
    
    for (const num of nums) {
        if (typeof num !== "number" || isNaN(num) || num < 0) {
            return false;
        }
    }

    return true;
}

//validate date whether given in string or obj format

const validateDate = (date) => {
    const dateObj = new Date(date);

    //valid if it creates a valid date object and it isnt already expired
    return !(isNaN(dateObj.getTime())) && dateObj >= new Date();

}

module.exports = { validateIngredient }