/**
 * services for User's stock list of Ingredient objects.
 * Ingredient collection holds 'global catalogue' of items with defaults.
 * Users can take from that global collection but have distinct objects in their own stock
 */

const User = require('../models/User');

/**
 * 
 * Adds an Ingredient from the Database to the User's stock
 * 
 * @param {name, portions, portionCost, expiryDate} ingredientData 
 * @param {*} userId 
 * @param ingredientId Optional, the ID of the Ingredient in the database.
 */
const addStock = async (ingredientData, userId, ingredientId=null) => {
    
    const ingredient = {...ingredientData, ingredientId};

    await User.findByIdAndUpdate(userId, {
        $push: {stock: ingredient}
    })

}


module.exports = {
    addStock
}