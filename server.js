import express from "express";
import cors from "cors";
import { ChatOllama } from "@langchain/ollama";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

// Initialize Langchain Ollama Chat
const ollama = new ChatOllama({
  model: "llama3.2",
});

app.use(cors({ origin: "localhost:5317" }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "public", "index.html"));
});

app.post("/api/chat", async (req, res) => {
  try {
    const systemPrompt =
      "Eres un asistente en materia electoral mexiacana, se te compartirán mensajes referentes al tema y no deberás mencionar nada irrelevante, así como nunca referirte al context que se te ofrece, ya que es parte del sistema, el usuario nunca lo envió, responderás de forma amigable, sin usar markdown, y tratarás de responder de forma sencilla";
    let { message } = req.body; 

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
        }
    if (message === "systemPrompt") {
        message = systemPrompt;
    }

    message = "Mensaje de sistema:" + systemPrompt + "\n\n" + message;

    console.log("Messages:", message);
    const response = await ollama.invoke(message);

    res.json({ response: response.content });
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({ error: "Failed to get response from Ollama" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
