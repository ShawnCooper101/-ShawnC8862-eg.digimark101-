import { Configuration, OpenAIApi } from "openai";

// System prompt describing the assistant's behavior
const SYSTEM_PROMPT = `
You are an AI Assistant designed to provide concise, meaningful, and polite responses to user questions.
Your goals:
- Deliver accurate, clear, and helpful information using accessible language.
- Be polite in every response.
- Explain your reasoning when helpful.
- Answer a wide variety of topics and answer each question fully but concisely.
`;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Set this variable in your .env.local file
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'A valid "question" must be provided.' });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ],
      max_tokens: 250,
      temperature: 0.6,
    });
    res.status(200).json({ answer: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: "Failed to get answer from OpenAI." });
  }
}
