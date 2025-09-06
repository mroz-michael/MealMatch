const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },

    portionCost: 
    {
        type: Number, 
        required: true,
        min: 0
    },

    portions: 
    {
        type: Number,
        required: true
    },

    expiryDate: 
    {
        type: Date,
        required: true
    },

    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = mongoose.model("Ingredient", IngredientSchema);