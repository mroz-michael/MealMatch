const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minLength: 3
    },

    pwHash: String,
    recipeList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Recipe",
        default: []
    },
    stock: {
        type: [
            {
                ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
                quantity: Number,
                expiryDate: Date
            }
        ],
        default: []
    },

    preferences: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model("User", UserSchema);