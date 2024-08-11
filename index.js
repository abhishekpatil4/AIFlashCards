const axios = require('axios');
const OLLAMA_API_URL = 'http://localhost:11434/api';

async function generateResponse(model, prompt) {
    try {
        const response = await axios.post(`${OLLAMA_API_URL}/generate`, {
            model: model,
            prompt: prompt
        }, {
            responseType: 'stream'
        });

        let fullResponse = '';

        return new Promise((resolve, reject) => {
            response.data.on('data', (chunk) => {
                const chunkStr = chunk.toString();
                const lines = chunkStr.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    const jsonChunk = JSON.parse(line);
                    fullResponse += jsonChunk.response;

                    if (jsonChunk.done) {
                        resolve(fullResponse);
                        return;
                    }
                }
            });

            response.data.on('end', () => {
                resolve(fullResponse);
            });

            response.data.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

async function main() {
    const model = 'llama3';
    const systemPrompt = "You're an AI assistant, I will give you come content, generate 3 short question and answers from it, content: ";
    const question = 'JavaScript is a versatile, high-level programming language primarily used for enhancing interactivity and dynamic content on websites. As a core technology of the web, alongside HTML and CSS, JavaScript enables developers to create rich user experiences by allowing for real-time updates, animations, and interactive features without the need for page reloads. Its key features include first-class functions, which allow functions to be treated as objects; asynchronous programming capabilities through callbacks, promises, and async/await; and a vast ecosystem of libraries and frameworks, such as React, Angular, and Vue.js, that streamline development. Additionally, JavaScript is supported by all modern browsers and can be executed on the server side using environments like Node.js, making it a powerful tool for both front-end and back-end development.';
    const prompt = systemPrompt + question;

    try {
        console.log("Prompting...");
        const response = await generateResponse(model, prompt);
        console.log('Generated response:', response);
    } catch (error) {
        console.error('Failed to generate response');
    }
}

main();