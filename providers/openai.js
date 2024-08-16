const axios = require('axios');
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateResponse(prompt) {
  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

async function main(prompt) {
  try {
    console.log("Prompting...");
    const response = await generateResponse(prompt);
    return response;
  } catch (error) {
    console.error('Failed to generate response');
    return "error"
  }
}

module.exports = main;