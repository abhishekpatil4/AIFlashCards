const generateFlashCards = require("../services/generate.service")
const Generate = require("../services/generate.service");
const GenerateInst = new Generate;

const generate = async (req, res) => {
    const content = req.body.content;
    const provider = req.body.provider;
    try {
        const fcards = await GenerateInst.generateFlashCards(provider, content);
        res.send(JSON.parse(fcards));
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = { generate }