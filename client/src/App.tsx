import { useState } from 'react';
import { Face } from './components/Face';
import type { Emotion } from './types/emotion';
import { analyzeEmotion } from './services/api';

function App() {
  const [message, setMessage] = useState('');
  const [emotion, setEmotion] = useState<Emotion>('neutral');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await analyzeEmotion(message);
    setEmotion(result);
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100 p-4">
      <Face emotion={emotion} />
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 rounded border border-gray-400"
          placeholder="Say something..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
