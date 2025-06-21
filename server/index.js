import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Groq } from 'groq-sdk';

dotenv.config();

const app = express();
const port = 3001;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { message } = req.body;

  const prompt = `Given the input "${message}", respond with only one word representing the user's emotion from this list: crying, sad, neutral, happy, very_happy, angry.`;

  try {
    const response = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }]
    });

    const emotion = response.choices[0].message.content.trim().toLowerCase();
    // const emotion = "Happy"
    res.json({ emotion });
  } catch (err) {
    console.error('Groq error:', err);
    res.status(500).json({ error: 'Failed to determine emotion' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
