'use client';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Counter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });

    let start = 0;
    const increment = end / 100;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [end, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center p-4"
    >
      <h2 className="text-4xl font-bold text-purple-600">{count}+</h2>
      <p className="text-gray-700">{label}</p>
    </motion.div>
  );
}
