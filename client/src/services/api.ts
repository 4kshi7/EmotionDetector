import axios from 'axios';
import type { Emotion } from '../types/emotion';

export const analyzeEmotion = async (message: string): Promise<Emotion> => {
  const res = await axios.post('http://localhost:3001/api/analyze', { message });
  return res.data.emotion;
};
