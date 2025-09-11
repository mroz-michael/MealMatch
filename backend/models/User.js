const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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
                ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
                name: String,
                portions: Number,
                portionCost: Number,
                expiryDate: Date
            }
        ],
        default: []
    },

    preferences: {
        type: [String],
        default: []
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    canCreate: {
        type: Boolean,
        default: false
    },
    
    canUpdate: {
        type: Boolean,
        default: false
    },

    canDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", UserSchema);