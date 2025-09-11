const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: true, 
        trim: true
    },
})

module.exports = mongoose.model("Ingredient", IngredientSchema);