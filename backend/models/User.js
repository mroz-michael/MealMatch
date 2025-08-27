const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    pwHash: String,
    recipeList: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
    stock: [
        {
            ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
            quantity: Number,
            expiryDate: Date
        }
    ],
    preferences: []
})

module.exports = mongoose.model("User", UserSchema);