import { motion } from 'framer-motion';
import type { Emotion } from '../types/emotion';

interface Props {
  emotion: Emotion;
}

const emotionStyles: Record<Emotion, { bg: string; emoji: string; scale: number }> = {
  crying: { bg: 'bg-blue-200', emoji: '😭', scale: 0.9 },
  sad: { bg: 'bg-gray-300', emoji: '😢', scale: 0.95 },
  neutral: { bg: 'bg-gray-200', emoji: '😐', scale: 1 },
  happy: { bg: 'bg-yellow-200', emoji: '🙂', scale: 1.05 },
  very_happy: { bg: 'bg-yellow-300', emoji: '😄', scale: 1.1 },
  angry: { bg: 'bg-red-300', emoji: '😡', scale: 1.05 }
};

export const Face: React.FC<Props> = ({ emotion }) => {
  const { bg, emoji, scale } = emotionStyles[emotion];
  return (
    <motion.div
      className={`w-48 h-48 ${bg} rounded-full flex items-center justify-center text-6xl`}
      animate={{ scale }}
      transition={{ duration: 0.4 }}
    >
      {emoji}
    </motion.div>
  );
};
