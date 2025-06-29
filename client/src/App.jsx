import { useState } from 'react';
import axios from 'axios';

const emotionImages = {
  crying: '/images/crying.jpg',
  sad: '/images/sad.jpg',
  neutral: '/images/neutral.jpg',
  happy: '/images/happy.jfif',
  very_happy: '/images/very_happy.jfif',
  angry: '/images/angry.webp',
};

export default function EmotionApp() {
  const [message, setMessage] = useState('');
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setEmotion('');

    try {
      const response = await axios.post('https://emotion-detector-gray.vercel.app/api/analyze', {
        message,
      });

      setEmotion(response.data.emotion);
    } catch (err) {
      console.error('API error:', err);
      alert('Failed to analyze emotion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className='bg-red-200 flex flex-col justify-between h-[50vh]'>


        <h1 className="text-3xl font-bold mb-6">Emotion Detector</h1>
        <input
          className="border border-gray-300 rounded px-4 py-2 w-80 mb-4"
          type="text"
          placeholder="Write your thoughts..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>

        {emotion && (
          <div className="mt-6 flex flex-col items-center">
            <p className="text-xl font-medium capitalize mb-2">Detected Emotion: {emotion}</p>
            <img
              src={emotionImages[emotion]}
              alt={emotion}
              className="w-40 h-40 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
