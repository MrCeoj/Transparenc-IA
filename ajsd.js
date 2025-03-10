
import { ChatOllama } from "@langchain/ollama";

const llama = new ChatOllama({
    model: 'llama3.2'
});

const input = 'Hey do you know langchain?';
const response = await llama.invoke(input);


console.log(response.content);