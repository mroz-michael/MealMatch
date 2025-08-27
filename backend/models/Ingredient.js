const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    expiryDate: Date
})

module.exports = mongoose.model("Ingredient", IngredientSchema);