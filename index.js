const express = require("express");
require('dotenv').config()
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000

const generateFlashCards = require("./FlashCard");
const { json } = require("body-parser");
const content = 'JavaScript is a versatile, high-level programming language primarily used for enhancing interactivity and dynamic content on websites. As a core technology of the web, alongside HTML and CSS, JavaScript enables developers to create rich user experiences by allowing for real-time updates, animations, and interactive features without the need for page reloads. Its key features include first-class functions, which allow functions to be treated as objects; asynchronous programming capabilities through callbacks, promises, and async/await; and a vast ecosystem of libraries and frameworks, such as React, Angular, and Vue.js, that streamline development. Additionally, JavaScript is supported by all modern browsers and can be executed on the server side using environments like Node.js, making it a powerful tool for both front-end and back-end development.';

const generate = async (content) => {
    return JSON.parse(await generateFlashCards("openai", content));
}

app.get("/generate", async (req, res) => {
    const content = req.body.content;
    try {
        const fcards = await generate(content);
        res.send(fcards);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(PORT, () => {
    console.log("Listening on Port ", PORT);
})