const axios = require('axios');
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
require('dotenv').config()
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

async function main() {
  const content = 'JavaScript is a versatile, high-level programming language primarily used for enhancing interactivity and dynamic content on websites. As a core technology of the web, alongside HTML and CSS, JavaScript enables developers to create rich user experiences by allowing for real-time updates, animations, and interactive features without the need for page reloads. Its key features include first-class functions, which allow functions to be treated as objects; asynchronous programming capabilities through callbacks, promises, and async/await; and a vast ecosystem of libraries and frameworks, such as React, Angular, and Vue.js, that streamline development. Additionally, JavaScript is supported by all modern browsers and can be executed on the server side using environments like Node.js, making it a powerful tool for both front-end and back-end development.';
  const prompt = `
    Generate 3 questions and answers based on the following content. Format the output as a JSON array of objects, each with 'question' and 'answer' fields. Do not include any outer object or additional fields.
    Content: ${content}
    Output format:
    [
      {
        "question": "Question 1",
        "answer": "Answer 1"
      },
      {
        "question": "Question 2",
        "answer": "Answer 2"
      },
      {
        "question": "Question 3",
        "answer": "Answer 3"
      }
    ]
    `;
  try {
    console.log("Prompting...");
    const response = await generateResponse(prompt);
    console.log(response);
  } catch (error) {
    console.error('Failed to generate response');
  }
}

main();