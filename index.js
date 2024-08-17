const express = require("express");
require('dotenv').config()
const app = express();
app.use(express.json());
const generateRoute = require("./routes/generate.route");
const PORT = process.env.PORT || 3000

app.use("/generate", generateRoute);

app.listen(PORT, () => {
    console.log("Listening on Port ", PORT);
})