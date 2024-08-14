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

async function main() {
  const model = 'llama3.1';
  const content = 'JavaScript is a versatile, high-level programming language primarily used for enhancing interactivity and dynamic content on websites. As a core technology of the web, alongside HTML and CSS, JavaScript enables developers to create rich user experiences by allowing for real-time updates, animations, and interactive features without the need for page reloads. Its key features include first-class functions, which allow functions to be treated as objects; asynchronous programming capabilities through callbacks, promises, and async/await; and a vast ecosystem of libraries and frameworks, such as React, Angular, and Vue.js, that streamline development. Additionally, JavaScript is supported by all modern browsers and can be executed on the server side using environments like Node.js, making it a powerful tool for both front-end and back-end development.';
  const prompt = `
    Generate 3 question and an answer based on the following content. Format the output as a JSON array of objects, each with 'question' and 'answer' fields. Do not include any outer object or additional fields.
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
    const response = await generateResponse(model, prompt);
    const res = response.response;
    console.log(res);
    // const data = JSON.parse(response);
    // console.log("Response: ", data);
  } catch (error) {
    console.error('Failed to generate response');
  }
}

main();