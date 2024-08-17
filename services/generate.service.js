const ollama_provider = require('../providers/ollama');
const openai_provider = require('../providers/openai');

class Generate {
  content = 'JavaScript is a versatile, high-level programming language primarily used for enhancing interactivity and dynamic content on websites. As a core technology of the web, alongside HTML and CSS, JavaScript enables developers to create rich user experiences by allowing for real-time updates, animations, and interactive features without the need for page reloads. Its key features include first-class functions, which allow functions to be treated as objects; asynchronous programming capabilities through callbacks, promises, and async/await; and a vast ecosystem of libraries and frameworks, such as React, Angular, and Vue.js, that streamline development. Additionally, JavaScript is supported by all modern browsers and can be executed on the server side using environments like Node.js, making it a powerful tool for both front-end and back-end development.';

  generateFlashCards = async (llm_provider = "openai", content = this.content) => {
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
    switch (llm_provider) {
      case "openai":
        return await openai_provider(prompt)
      case "ollama":
        return await ollama_provider(prompt)
      default:
        return await ollama_provider(prompt)
    }
  }
}

module.exports = Generate;