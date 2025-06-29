import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Groq } from 'groq-sdk';

dotenv.config();

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  const prompt = `Given the input "${message}", respond with only one word representing the user's emotion from this list: crying, sad, neutral, happy, very_happy, angry. Please in the output give only one word`;

  try {
    const response = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }]
    });

    const emotion = response.choices[0].message.content.trim().toLowerCase();
    res.json({ emotion });
  } catch (err) {
    console.error('Groq error:', err);
    res.status(500).json({ error: 'Failed to determine emotion' });
  }
});

export default app;
