const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

connectDB().then(() => {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server up on port ${PORT}`);
    })
})

