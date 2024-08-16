const axios = require('axios');
const OLLAMA_API_URL = 'http://localhost:11434/api';

async function generateResponse(model, prompt) {
  try {
    const response = await axios.post(`${OLLAMA_API_URL}/generate`, {
      model: model,
      prompt: prompt,
      format: 'json',
      stream: false,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

async function main(prompt) {
  const model = 'llama3.1';
  try {
    console.log("Prompting...");
    const response = await generateResponse(model, prompt);
    const res = response.response;
    // console.log(res);
    return res;
  } catch (error) {
    console.error('Failed to generate response');
    return "error";
  }
}

module.exports = main;