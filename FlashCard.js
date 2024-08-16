const ollama_provider = require('./providers/ollama');
const openai_provider = require('./providers/openai');

const generateFlashCards = async (llm_provider, content) => {
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

module.exports = generateFlashCards;