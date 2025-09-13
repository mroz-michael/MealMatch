const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const stockRoutes = require('./routes/userStockRoutes');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/user/stock", stockRoutes);

connectDB().then(() => {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server up on port ${PORT}`);
    })
})

