const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [
                {
                    ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
                    amount: Number,
                }
    ],
    daysSinceEaten: Number,
    priority: Number //could use better name, basically the metric used to determine whether it should be made next or not
})

module.exports = mongoose.model("Recipe", RecipeSchema);