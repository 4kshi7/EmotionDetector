import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Groq } from 'groq-sdk';

dotenv.config();

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

const EMOTIONS = ['crying', 'sad', 'neutral', 'happy', 'very_happy', 'angry'];

app.post('/api/analyze', async (req, res) => {
  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  const prompt = `Classify the user's emotion from the following list: crying, sad, neutral, happy, very_happy, angry. 
Respond with only one word (no sentence or explanation). Input: "${message}"`;

  try {
    const response = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }]
    });

    let emotion = response.choices[0].message.content.trim().toLowerCase();

    // Post-process: extract only a valid emotion from the list
    const match = EMOTIONS.find(e => emotion.includes(e));
    if (!match) {
      throw new Error(`Invalid response: ${emotion}`);
    }

    res.json({ emotion: match });
  } catch (err) {
    console.error('Groq error:', err.message || err);
    res.status(500).json({ error: 'Failed to determine emotion' });
  }
});

export default app;
